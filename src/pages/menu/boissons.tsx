import { MartiniIcon, WineIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";

const sections = [
  {
    name: "alcool",
    icon: <MartiniIcon />,
    menu: "alcool",
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
      menuItemSubCategoryClasses:
        "text-2xl font-glass text-padre-primary uppercase tracking-widest mt-12 mb-6 text-center border-b border-white/10 pb-2",
    },
  },
] as const;

export const MenuBoissons = () => {
  return <MenuLayout menu={sections as any} />;
};
