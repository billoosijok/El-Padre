import boissons from "@/config/menu/boissons.json";
import { MartiniIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";

const sections = [
  {
    name: "Cocktails",
    icon: <MartiniIcon />,
    menu: boissons.cocktails,
  },
  {
    name: "Bières",
    icon: <MartiniIcon />,
    menu: boissons["Bières"],
  },
  {
    name: "Apéritifs & Digestifs",
    icon: <MartiniIcon />,
    menu: boissons["Apéritifs & Digestifs"],
  },
] as const;

export const MenuBoissons = () => {
  return <MenuLayout menu={sections as any} />;
};
