import { CoffeeIcon } from "@/components/icons";
import { MenuLayout } from "@/layouts/menu";
import { SEO } from "@/components/SEO";
import { useI18n } from "@/hooks/useTranslations";

const sections = [
  {
    name: "Brunch",
    icon: <CoffeeIcon />,
    menu: "brunch",
    flatten: true,
  },
] as const;

export const MenuBrunch = () => {
  const { goodLabel } = useI18n();

  return (
    <MenuLayout
      heroImage="/assets/brunch.jpg"
      heroTitle={goodLabel("brunch")}
      menu={sections as any}
      theme="light"
    >
      <SEO
        breadcrumbs={[
          { name: goodLabel("breadcrumbs_home"), item: "/" },
          { name: goodLabel("breadcrumbs_brunch"), item: "/brunch" },
        ]}
        description={goodLabel("seo_brunch_description")}
        title={goodLabel("seo_brunch_title")}
      />
    </MenuLayout>
  );
};
