import { Tab, Tabs } from "@heroui/tabs";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Spinner } from "@heroui/spinner";
import { useNavigate } from "react-router-dom";
import { FC, Fragment, Key, useCallback, useEffect, useState } from "react";

import DefaultLayout from "./default";

import { TabTitle } from "@/pages/menu/components/TabTitle";
import { useI18n, DEFAULT_LANGUAGE } from "@/hooks/useTranslations";
import { WineBottleIcon, WineGlassIcon } from "@/components/icons";

interface MenuSection {
  name: string;
  icon: JSX.Element;
  menu: any;
  customizations?: any;
}

export const MenuLayout = ({ menu: sections }: { menu: MenuSection[] }) => {
  const [, , activeTab] =
    window.location.pathname.match(/(menu|boissons)\/([^\/]+)/i) || [];

  const navigate = useNavigate();
  const { goodLabel } = useI18n();

  const onChangeTab = useCallback((activeTab: Key) => {
    navigate(activeTab.toString());
  }, []);

  return (
    <DefaultLayout title={<h1>{goodLabel("menu")}</h1>}>
      <div className="max-w-3xl m-auto flex flex-col align-center px-6 pb-20">
        <Tabs
          fullWidth
          className="sticky top-4 flex justify-center mb-6 px-2"
          classNames={{
            cursor: "w-full bg-primary",
            tabContent:
              "group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
            tab: "py-5 text-md font-league",
          }}
          selectedKey={decodeURI(activeTab)}
          onSelectionChange={onChangeTab}
        >
          {sections?.map((section) => (
            <Tab
              key={section.name.toLowerCase()}
              className="flex-1"
              title={
                <TabTitle
                  icon={section.icon}
                  label={goodLabel(section.name as any)}
                />
              }
            >
              <MenuSection key={section.name + section.menu} {...section} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

const cachedMenus: { [index: string]: any } = {};

const MenuSection: FC<MenuSection> = ({ menu, name, customizations = {} }) => {
  const [resolvedMenu, setResolvedMenu] = useState(cachedMenus[menu]);
  const { language } = useI18n();
  const extension = DEFAULT_LANGUAGE === language ? "" : `.${language}`;

  useEffect(() => {
    (async () => {
      if (!cachedMenus[menu]) {
        let module;

        try {
          module = await import(`../config/menu/${menu}${extension}.json`);
        } catch {
          module = await import(`../config/menu/${menu}.json`);
        }

        cachedMenus[menu] = module.default;
        setResolvedMenu(cachedMenus[menu]);
      }
    })();
  }, [language, menu]);

  return resolvedMenu ? (
    <Accordion
      className="px-0 overflow-hidden"
      itemClasses={{
        heading: "px-4 bg-[#efeae7]",
        title: "font-cardo",
        content: "px-4 bg-white",
      }}
      selectionMode="multiple"
      variant="bordered"
    >
      {resolvedMenu?.map(({ category, items }: any, index: number) => (
        <AccordionItem key={name + category + index} title={category}>
          <div className="flex flex-col gap-2">
            {items.map((item: any) => {
              if (item.category) {
                return (
                  <Fragment key={item.category}>
                    <h5
                      className={
                        customizations?.menuItemSubCategoryClasses
                          ? `${customizations.menuItemSubCategoryClasses}`
                          : ""
                      }
                    >
                      {item.category}
                    </h5>
                    {item.items.map((item: any) => (
                      <MenuItem
                        key={item.name}
                        customizations={customizations}
                        item={item}
                      />
                    ))}
                  </Fragment>
                );
              }

              return (
                <MenuItem
                  key={item.name}
                  customizations={customizations}
                  item={item}
                />
              );
            })}
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <div className="flex justify-center py-12">
      <Spinner />
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
    <span className="text-slate-600 lowercase font-light">
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
        <span className="text-sm text-slate-500 font-light">
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
  customizations: MenuSection["customizations"];
}) => {
  const { menuItemNameClasses } = customizations;

  return (
    <div>
      <h5
        className={
          menuItemNameClasses
            ? menuItemNameClasses
            : `font-cardo font-light uppercase`
        }
      >
        <MenuItemName item={item} /> <MenuItemPrice price={item.price} />
      </h5>
      <p className="font-league font-light text-zinc-500 text-sm">
        {item.description}
      </p>
    </div>
  );
};
