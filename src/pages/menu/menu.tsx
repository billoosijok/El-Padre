import { useState } from "react";

import { MenuSelector } from "./components/MenuSelector";

import { PlatsMenuIcon, TapasMenuIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";
import {
  isEntryOnMenu,
  getMenuOptionSelected,
  setMenuOptionSelected,
} from "@/config/landing";

const sections = [
  {
    name: "Tapas",
    icon: <TapasMenuIcon />,
    menu: "tapas",
    flatten: false,
  },
  {
    name: "Plats",
    icon: <PlatsMenuIcon />,
    menu: "plats",
    flatten: true,
  },
] as const;

export const Menu = () => {
  const { goodLabel, getLocalizedPath } = useI18n();
  const [showSelector, setShowSelector] = useState(() => {
    return isEntryOnMenu && !getMenuOptionSelected();
  });

  if (showSelector) {
    return (
      <MenuSelector
        brunchUrl={getLocalizedPath("/brunch")}
        onChooseBrunch={() => {
          setMenuOptionSelected(true);
        }}
        onChooseRegular={() => {
          setMenuOptionSelected(true);
          setShowSelector(false);
        }}
      />
    );
  }

  return (
    <MenuLayout
      heroImage="/assets/menu-hero.jpg"
      heroSubtitle={goodLabel("seo_menu_description")}
      heroTitle={goodLabel("menu")}
      menu={sections as any}
    >
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("breadcrumbs_menu"), item: "/menu" },
        ]}
        description={goodLabel("seo_menu_description")}
        title={goodLabel("menu")}
      />
    </MenuLayout>
  );
};
