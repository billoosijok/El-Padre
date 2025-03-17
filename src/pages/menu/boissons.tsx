import { MartiniIcon, WineIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";

const sections = [
  {
    name: "alcool",
    icon: <MartiniIcon />,
    menu: "alcool",
    customizations: {
      menuItemNameFont: "font-league",
    },
  },
  {
    name: "sans alcool",
    icon: <MartiniIcon />,
    menu: "sans-alcool",
  },
  {
    name: "vin",
    icon: <WineIcon />,
    menu: "vin",
    customizations: {
      menuItemSubCategoryClasses: "font-glass uppercase text-2xl",
      menuItemNameClasses: "font-league font-[400] text-lg",
    },
  },
] as const;

export const MenuBoissons = () => {
  return <MenuLayout menu={sections as any} />;
};
