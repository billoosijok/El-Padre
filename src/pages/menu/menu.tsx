import { PlatsMenuIcon, TapasMenuIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";

const sections = [
  {
    name: "Tapas",
    icon: <TapasMenuIcon />,
    menu: "tapas",
  },
  {
    name: "Plats",
    icon: <PlatsMenuIcon />,
    menu: "plats",
  },
] as const;

export const Menu = () => {
  return <MenuLayout menu={sections as any} />;
};
