import { Link } from "react-router-dom";

import { Logo } from "@/components/logo";
import DefaultLayout from "@/layouts/default";
import { FacebookIcon, InstagramIcon, TiktokIcon } from "@/components/icons";
export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-6">
        <div className="inline-block max-w-lg text-center justify-center">
          <Logo />
        </div>
        <div>
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

          <p className="py-12">À très bientôt ...</p>
        </div>
      </section>
    </DefaultLayout>
  );
}
