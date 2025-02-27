import { Link } from "react-router-dom";
import { useLayoutEffect } from "react";

import DefaultLayout from "@/layouts/default";
import {
  FacebookIcon,
  InstagramIcon,
  PlatsMenuIcon,
  TapasMenuIcon,
  TiktokIcon,
} from "@/components/icons";
import { LinkItem } from "@/components/LinkItem";
import { Logo } from "@/components/Logo";
import { useSessionStorage } from "@/hooks/useSessionStorage";

const Links = [
  {
    name: "Tapas",
    Icon: TapasMenuIcon,
    to: "/menu/tapas",
    bg: "url(bg-tapas.jpg)",
  },
  {
    name: "Plats",
    Icon: PlatsMenuIcon,
    to: "menu/plats",
    bg: "url(bg-plats.jpg)",
  },
  // {
  //   name: "Boissons",
  //   Icon: DrinksMenuIcon,
  //   to: "/menu/boissons",
  //   bg: "#b8a470 url(bg-boissons.png)",
  // },
];

export default function IndexPage() {
  const sessStorage = useSessionStorage();
  const existingSession = sessStorage.get("existing");

  useLayoutEffect(() => {
    sessStorage.set("existing", "true");
  }, []);

  return (
    <DefaultLayout
      key={location.pathname}
      homeTreatment
      contentOffset="60vh"
      title={
        <>
          <Logo animation={existingSession ? "simple" : "full"} />
          <div className="social-links">
            <div className="flex flex-row gap-4 align-middle">
              <Link to="https://www.instagram.com/el_padre.11">
                <InstagramIcon height={"2em"} width={"2em"} />
              </Link>
              <Link to="https://www.tiktok.com/@el_padre.11">
                <TiktokIcon height={"2em"} width={"2em"} />
              </Link>
              <Link to="https://www.facebook.com/profile.php?id=61568366311415">
                <FacebookIcon height={"2em"} width={"2em"} />
              </Link>
            </div>
            <p className="text-center">@el_padre.11</p>
          </div>
        </>
      }
    >
      <div className="flex justify-center flex-col">
        {Links.map((lnk) => (
          <>
            {/* @ts-ignore */}
            <LinkItem key={lnk.name} {...lnk}>
              {lnk.name}
            </LinkItem>
          </>
        ))}
      </div>
    </DefaultLayout>
  );
}
