import { Link } from "react-router-dom";
import {
  Fragment,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

import "./index.css";

import DefaultLayout from "@/layouts/default";
import {
  FacebookIcon,
  InstagramIcon,
  MartiniIcon,
  PlatsMenuIcon,
  TapasMenuIcon,
  TiktokIcon,
} from "@/components/icons";
import { LinkItem } from "@/components/LinkItem";
import { Logo } from "@/components/Logo";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useI18n } from "@/hooks/useTranslations";

const Links = [
  {
    name: "tapas",
    Icon: TapasMenuIcon,
    to: "/menu/tapas",
    bg: "url(bg-tapas.jpg)",
  },
  {
    name: "plats",
    Icon: PlatsMenuIcon,
    to: "menu/plats",
    bg: "url(bg-plats.jpg)",
  },
  {
    name: "Boissons",
    Icon: MartiniIcon,
    to: "/boissons",
    bg: "#b8a470 url(bg-boissons.png)",
  },
];

export default function IndexPage() {
  const sessStorage = useSessionStorage();
  const existingSession = sessStorage.get("existing");
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  const { goodLabel } = useI18n();

  useLayoutEffect(() => {
    sessStorage.set("existing", "true");
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current?.play();
    }
  }, [videoRef.current]);

  return (
    <div>
      {/* <video ref={videoRef} muted className="video-bg" src="/bg.mp4" /> */}
      <DefaultLayout
        homeTreatment
        contentOffset="80vh"
        title={
          <>
            <Logo animation={existingSession ? "simple" : "full"} />
            <div className="social-links ">
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
            <Fragment key={lnk.name}>
              {/** @ts-ignore */}
              <LinkItem key={lnk.name} {...lnk}>
                {goodLabel(lnk.name as any)}
              </LinkItem>
            </Fragment>
          ))}
        </div>
      </DefaultLayout>
    </div>
  );
}
