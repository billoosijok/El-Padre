import { PlatsMenuIcon, TapasMenuIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";
import { SEO } from "@/components/SEO";

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
  return (
    <MenuLayout menu={sections as any}>
      <SEO
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Menu", item: "/menu" },
        ]}
        description="Découvrez notre menu varié : tapas maison, plats traditionnels et desserts gourmands à Narbonne."
        title="Menu | Tapas & Plats"
      />
    </MenuLayout>
  );
};
