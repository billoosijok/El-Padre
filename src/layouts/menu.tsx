import { Tab, Tabs } from "@heroui/tabs";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { useNavigate } from "react-router-dom";
import { Key, useCallback, useEffect, useState } from "react";

import DefaultLayout from "./default";

import { TabTitle } from "@/pages/menu/components/TabTitle";
import { useI18n } from "@/hooks/useTranslations";

interface MenuSection {
  name: string;
  icon: JSX.Element;
  menu: any;
  resolvedMenu?: any;
}

export const MenuLayout = ({ menu: sections }: { menu: MenuSection[] }) => {
  const [, activeTab] = window.location.pathname.match(/menu\/([^\/]+)/i) || [];
  const [resolvedSections, setResolvedSections] = useState<MenuSection[]>();
  const navigate = useNavigate();
  const { goodLabel, language } = useI18n();

  useEffect(() => {
    Promise.all(
      sections.map(async (sec) => {
        let jsonMenu;

        try {
          jsonMenu = await import(
            `../config/menu/${sec.menu}.${language}.json`
          );
        } catch {
          jsonMenu = await import(`../config/menu/${sec.menu}.json`);
        }

        return { ...sec, menu: jsonMenu.default };
      }),
    ).then(setResolvedSections);
  }, [language]);

  const onChangeTab = useCallback((activeTab: Key) => {
    navigate(activeTab.toString());
  }, []);

  return (
    <DefaultLayout title={<h1>{goodLabel("menu")}</h1>}>
      <div className="max-w-3xl m-auto flex flex-col align-center px-6">
        <Tabs
          fullWidth
          className="sticky top-4 flex justify-center mb-6 px-2"
          classNames={{
            cursor: "w-full bg-primary",
            tabContent:
              "group-data-[selected=true]:text-white group-data-[selected=true]:font-bold",
            tab: "py-5 text-md font-league",
          }}
          selectedKey={activeTab}
          onSelectionChange={onChangeTab}
        >
          {resolvedSections?.map((section) => (
            <Tab
              key={section.name.toLowerCase()}
              className="flex-1"
              title={<TabTitle icon={section.icon} label={section.name} />}
            >
              <Accordion
                className="px-0 overflow-hidden"
                itemClasses={{
                  heading: "px-4 bg-[#efeae7]",
                  title: "font-cardo",
                  content: "px-4",
                }}
                selectionMode="multiple"
                variant="bordered"
              >
                {section?.menu?.map(({ category, items }: any) => (
                  <AccordionItem key={section.name + category} title={category}>
                    <div className="flex flex-col gap-2">
                      {items.map((item: any) => (
                        <div key={item.name}>
                          <h5 className="font-[Cardo] font-light uppercase">
                            {item.name} {item.price}
                          </h5>
                          <p className="font-league font-light text-zinc-500 text-sm">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </Tab>
          ))}
        </Tabs>
      </div>
    </DefaultLayout>
  );
};
