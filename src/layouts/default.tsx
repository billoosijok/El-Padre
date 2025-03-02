import { ReactNode, useRef } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

import { useI18n } from "@/hooks/useTranslations";
import { FloatingContent } from "@/components/FloatingContent";
import { useIsTouching } from "@/hooks/useIsTouching";
import { Logo } from "@/components/Logo";
import { LanguageSelectorDropdown } from "@/components/LanguageSelector";

export default function DefaultLayout({
  children,
  title,
  contentOffset = "250px",
  homeTreatment,
}: {
  children: React.ReactNode;
  title: ReactNode;
  contentOffset?: string;
  homeTreatment?: boolean;
}) {
  const { goodLabel } = useI18n();
  const fixedRef = useRef(null);
  const targetRef = useRef(null);
  const isTouchingTheTop = useIsTouching(targetRef, fixedRef);

  return (
    <div className="relative">
      <header className="flex flex-col items-center gap-4">
        <div
          ref={fixedRef}
          className={`items-center fixed top-0 z-20 w-full px-6 py-4 ${isTouchingTheTop ? "shadow-lg bg-[hsl(var(--padre-background))]" : ""}`}
        >
          <div className="m-auto max-w-screen-lg flex flex-row justify-between">
            <div className="flex-1">
              {(!homeTreatment || isTouchingTheTop) && (
                <a className="animate-[entrance]" href="/">
                  <Logo animation="simple" size={40} />
                </a>
              )}
            </div>
            <div className="flex-1 flex gap-2 flex-row justify-end items-center">
              <LanguageSelectorDropdown />
              <Button
                as={Link}
                className="rounded-2xl"
                color="primary"
                href="tel:0468324011"
                variant="bordered"
              >
                {goodLabel("reserve")}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center fixed top-28">{title}</div>
      </header>
      <div
        style={{ filter: `drop-shadow(-1px -3px 6px rgba(50, 50, 0, 0.5))` }}
      >
        <div ref={targetRef} style={{ marginTop: contentOffset }}>
          <FloatingContent maxClip={homeTreatment ? 10 : 5}>
            <main>{children}</main>
            <footer className="w-full flex flex-col gap-10 py-20">
              <div className="w-full items-stretch flex gap-4 justify-center ">
                <div className="flex-1 text-right">
                  <h3 className="text-2xl">{goodLabel("contact")}</h3>
                  <p>
                    <a href="https://maps.app.goo.gl/upvp6fR7qbgHyYpP9">
                      29 Cours de la République, 11100 Narbonne
                    </a>
                  </p>
                  <br />
                  <p>
                    <a href="tel:+33468324011">04 68 32 40 11</a>
                  </p>
                </div>
                <div className="divider border-r-small border-gray-500" />
                <div className="flex-1">
                  <h3 className="text-2xl">{goodLabel("nos horaires")}</h3>
                  <p>{goodLabel("ouvert j7/7")}</p>
                  <p>{goodLabel("ven - dim")} : 12H - 2H</p>
                  <p>{goodLabel("autres jours")} : 12H - 15H | 18H - 2H</p>
                </div>
              </div>
              <Logo size={80} style={{ opacity: 0.5 }} />
            </footer>
          </FloatingContent>
        </div>
      </div>
    </div>
  );
}
