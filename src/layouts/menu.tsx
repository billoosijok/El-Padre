import { Spinner } from "@heroui/spinner";
import { Fragment, createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import DefaultLayout from "./default";

import { useI18n, DEFAULT_LANGUAGE } from "@/hooks/useTranslations";
import { WineBottleIcon, WineGlassIcon } from "@/components/icons";

interface MenuSectionConfig {
  name: string;
  icon: JSX.Element;
  menu: any;
  customizations?: any;
  flatten?: boolean;
}

// Helper to load menu data
const loadMenuData = async (menuName: string, language: string) => {
  const extension = DEFAULT_LANGUAGE === language ? "" : `.${language}`;
  try {
    const module = await import(`../config/menu/${menuName}${extension}.json`);
    return module.default;
  } catch {
    // Fallback to default
    try {
      const module = await import(`../config/menu/${menuName}.json`);
      return module.default;
    } catch (e) {
      console.error(`Failed to load menu: ${menuName}`, e);
      return [];
    }
  }
};

const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const MenuContext = createContext<{
  activeItemId: string | null;
  setActiveItemId: (id: string) => void;
  modalImage: string | null;
  setModalImage: (url: string | null) => void;
}>({
  activeItemId: null,
  setActiveItemId: () => { },
  modalImage: null,
  setModalImage: () => { },
});

const MenuLayoutWrapper = (props: any) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <MenuContext.Provider value={{ activeItemId, setActiveItemId, modalImage, setModalImage }}>
      <MenuLayoutContent {...props} />
    </MenuContext.Provider>
  );
};

export { MenuLayoutWrapper as MenuLayout };

const MenuLayoutContent = ({ menu: sectionConfigs, children }: { menu: MenuSectionConfig[], children?: React.ReactNode }) => {
  const { language, goodLabel } = useI18n();
  const location = useLocation();
  const { modalImage, setModalImage } = useContext(MenuContext);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isScrollingProgrammatically = useRef(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Load all sections
  useEffect(() => {
    const fetchAllMenuData = async () => {
      setIsLoading(true);
      const loadedItems: any[] = [];

      for (const config of sectionConfigs) {
        const data = await loadMenuData(config.menu, language);
        if (Array.isArray(data)) {
          if (config.flatten === false) {
            // Consolidated specific section (like Tapas)
            loadedItems.push({
              id: config.menu,
              category: config.name,
              items: data,
              customizations: config.customizations,
              isConsolidated: true
            });
          } else {
            // Flattened sections (like Plats)
            const content = data.map((cat: any) => ({
              ...cat,
              id: `${config.menu}-${slugify(cat.id || cat.category)}`, // Unique ID
              parentId: config.menu,
              customizations: config.customizations,
              isConsolidated: false
            }));
            loadedItems.push(...content);
          }
        }
      }

      setMenuItems(loadedItems);
      if (loadedItems.length > 0) {
        setActiveSection(loadedItems[0].id);
      }
      setIsLoading(false);
    };
    fetchAllMenuData();
  }, [sectionConfigs, language]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isScrollingProgrammatically.current = true;
      const y = el.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      window.history.pushState(null, "", `#${id}`);

      // Reset after animation
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1500);
    }
  };

  useEffect(() => {
    if (!isLoading && location.hash && !isScrollingProgrammatically.current) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          scrollToSection(id);
        }, 100);
      }
    }
  }, [isLoading, location.hash]);

  useEffect(() => {
    if (activeSection && navContainerRef.current) {
      const activeTab = document.getElementById(`tab-${activeSection}`);
      if (activeTab) {
        const container = navContainerRef.current;
        const tabRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate offset relative to the container
        const offset = tabRect.left - containerRect.left;
        const centerOffset = (containerRect.width / 2) - (tabRect.width / 2);
        const scrollAmount = offset - centerOffset;

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  if (isLoading) {
    return (
      <DefaultLayout title={<h1>{goodLabel("menu")}</h1>}>
        <div className="h-screen flex items-center justify-center">
          <Spinner color="warning" size="lg" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout title={<h1>{goodLabel("menu")}</h1>}>
      {children}
      {/* Background Texture */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat opacity-10" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 m-auto flex flex-col align-center px-4 pb-20">

        {/* Sticky Nav Bar */}
        <div
          ref={navContainerRef}
          className="sticky top-[80px] z-50 py-2 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10 mb-8 -mx-4 px-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          <div className="flex gap-8 min-w-max max-w-4xl m-auto px-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`py-4 text-sm uppercase tracking-[0.2em] font-bold transition-all duration-300 border-b-2 ${activeSection === item.id
                  ? "text-white border-white"
                  : "text-gray-500 hover:text-white border-transparent"
                  }`}
              >
                {item.category}
              </button>
            ))}
          </div>
        </div>

        {/* Sections Content */}
        <div className="flex flex-col m-auto max-w-4xl gap-24">
          {menuItems.map((item) => (
            <MenuSectionSpy
              key={item.id}
              id={item.id}
              onInView={(id) => {
                if (!isScrollingProgrammatically.current) {
                  setActiveSection(id);
                }
              }}
            >
              <div className="flex flex-col gap-6">
                {!item.isConsolidated && (
                  <h3 className="sticky top-[146px] z-40 bg-[#1a1a1a]/95 backdrop-blur-sm py-3 text-2xl font-cormorant text-left border-b border-padre-primary/30 text-padre-primary uppercase tracking-widest shadow-lg mb-8 pl-4 border-l-4 border-l-padre-primary">
                    {item.category}
                  </h3>
                )}
                {item.isConsolidated && (
                  <div className="mb-8 pl-4 border-l-4 border-l-padre-primary">
                    <h3 className="text-3xl font-cormorant text-padre-primary uppercase tracking-widest">
                      {item.category}
                    </h3>
                  </div>
                )}
                <div className="flex flex-col gap-8">
                  {item.items.map((subItem: any, idx: number) => {
                    if (subItem.category) {
                      return (
                        <Fragment key={idx}>
                          <h5
                            className={
                              item.customizations?.menuItemSubCategoryClasses
                                ? item.customizations.menuItemSubCategoryClasses
                                : "sticky top-[146px] z-40 bg-[#1a1a1a]/95 backdrop-blur-sm py-3 text-2xl font-cormorant text-left border-b border-padre-primary/30 text-padre-primary uppercase tracking-widest shadow-lg mb-8 pl-4 border-l-4 border-l-padre-primary"
                            }
                          >
                            {subItem.category}
                          </h5>
                          {subItem.items.map((nestedItem: any) => (
                            <MenuItem
                              key={nestedItem.name} // Ensure unique keys if names are unique
                              customizations={item.customizations}
                              item={nestedItem}
                            />
                          ))}
                        </Fragment>
                      );
                    }
                    return (
                      <MenuItem
                        key={subItem.name}
                        customizations={item.customizations}
                        item={subItem}
                      />
                    )
                  })}
                </div>
              </div>
            </MenuSectionSpy>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalImage(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={modalImage}
              alt="Full screen preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 text-white hover:text-padre-primary transition-colors bg-black/50 rounded-full p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </DefaultLayout>
  );
};

const MenuSectionSpy = ({
  id,
  onInView,
  children,
}: {
  id: string;
  onInView: (id: string) => void;
  children: any;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(id);
    }
  }, [isInView, id, onInView]);

  return (
    <div ref={ref} id={id} className="scroll-mt-48">
      {children}
    </div>
  );
};

type PriceValue = { name: string; value: number };
const shortPriceValueName = (value: string) => {
  switch (value) {
    case "Bouteille":
    case "bouteille":
      return (
        <WineBottleIcon
          className="inline relative bottom-1 opacity-60"
          size={18}
        />
      );
    case "Verre":
    case "verre":
      return (
        <WineGlassIcon
          className="inline relative bottom-[2px] opacity-60"
          size={15}
        />
      );
    case "25cl":
    case "25CL":
    case "50cl":
    case "50CL":
    case "33cl":
      return <span className="text-xs lowercase">{value}</span>;
    default:
      return value;
  }
};
const MenuItemPrice = ({ price }: { price: number | PriceValue[] }) => {
  return (
    <span className="text-padre-primary lowercase font-medium whitespace-nowrap text-lg">
      {typeof price === "number"
        ? price
        : price
          .sort((a, b) => a.value - b.value)
          .map((pVal, i) => {
            const markup = (
              <span key={pVal.value}>
                {shortPriceValueName(pVal.name)}{" "}
                {pVal.value.toString().replace(".", ",")}
              </span>
            );

            return i === 0 ? markup : <> | {markup}</>;
          })}
    </span>
  );
};

const MenuItemName = ({ item }: { item: any }) => {
  return (
    <span>
      {item.name}{" "}
      {item.extraInfo ? (
        <span className="text-sm text-gray-500 font-light italic ml-2">
          {item.extraInfo}
        </span>
      ) : null}
    </span>
  );
};

const MenuItem = ({
  item,
  customizations = {},
}: {
  item: any;
  customizations?: MenuSectionConfig["customizations"];
}) => {
  const { menuItemNameClasses } = customizations || {};
  const { activeItemId, setActiveItemId, setModalImage } = useContext(MenuContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveItemId(item.name);
    }
  }, [isInView, item.name, setActiveItemId]);

  const isActive = activeItemId === item.name;
  const hasImage = item.image && item.image.thumb && item.image.full;

  return (
    <motion.div
      ref={ref}
      layout
      data-menu-item-id={item.name}
      className={`flex flex-row gap-4 items-center justify-between py-6 border-b border-dashed border-white/10 last:border-0 relative min-h-[120px] ${isActive ? "z-20" : "z-10"
        } group hover:bg-white/5 transition-colors duration-300 rounded-lg px-4`}
      onClick={() => {
        if (hasImage) {
          setModalImage(item.image.full);
        }
      }}
    >
      <div className="flex-1 z-10 w-full transition-all duration-500 ease-in-out">
        <div className="mb-2">
          <h5
            className={
              menuItemNameClasses
                ? menuItemNameClasses
                : `font-cormorant font-bold uppercase text-2xl text-white group-hover:text-padre-primary transition-colors`
            }
          >
            <MenuItemName item={item} />{" "}
            <span className="font-light text-padre-primary text-xl normal-case">
              - <MenuItemPrice price={item.price} />
            </span>
          </h5>
        </div>
        <p className="font-lato font-light text-gray-400 text-sm leading-relaxed max-w-[90%]">
          {item.description}
        </p>
      </div>

      {hasImage && (
        <motion.div
          layout
          className="flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] w-24 h-24 flex items-center justify-center cursor-pointer"
        >
          <motion.div
            animate={{
              scale: isActive ? 1.5 : 0.8,
              opacity: 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <img
              src={item.image.thumb}
              alt={item.name}
              className="w-full h-full object-cover shadow-2xl border border-white/10 bg-zinc-900 rounded-xl"
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
