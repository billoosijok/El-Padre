import { PlatsMenuIcon, TapasMenuIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";


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
  const { goodLabel } = useI18n();
  return (

    <MenuLayout menu={sections as any}>
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
