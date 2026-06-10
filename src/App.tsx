import {
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ReactGA from "react-ga4";

import { LanguageSwitchNotification } from "./components/LanguageSwitchNotification";
import "@/config/landing";

const Menu = lazy(() => import("./pages/menu/menu").then(module => ({ default: module.Menu })));
const MenuBoissons = lazy(() => import("./pages/menu/boissons").then(module => ({ default: module.MenuBoissons })));
const MenuBrunch = lazy(() => import("./pages/menu/brunch").then(module => ({ default: module.MenuBrunch })));
import { I18nProvider, SupportedLanguages, supported_languages } from "./hooks/useTranslations";
import { ReservationProvider } from "@/context/ReservationContext";

const IndexPage = lazy(() => import("@/pages/index"));
const PrivatisationPage = lazy(() => import("@/pages/privatisation"));
const ContactPage = lazy(() => import("@/pages/contact"));
const MentionsLegalesPage = lazy(() => import("@/pages/mentions-legales"));
const PolitiqueConfidentialitePage = lazy(() => import("@/pages/politique-de-confidentialite"));
const PolitiqueCookiesPage = lazy(() => import("@/pages/politique-de-cookies"));
const ReviewsPage = lazy(() => import("@/pages/reviews"));
const ReservationPage = lazy(() => import("@/pages/reservation"));

ReactGA.initialize("G-VH1QHTSLEM");

const RedirectToVote = () => {
  useEffect(() => {
    // Record GA event
    ReactGA.event({
      category: "User",
      action: "Click Vote Redirect",
      label: "Google Form",
    });

    // Short delay to ensure GA event is sent
    const timer = setTimeout(() => {
      window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSd0YEcfg7e5E3bLDrGfcEL7uJDfk8iqBUTu1uaVcvd77mRKCQ/viewform");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

const RouteWrapper = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RouteWrapper />}>
        <Route index element={<IndexPage />} />
        <Route element={<MenuBoissons />} path="boissons/*" />
        <Route element={<PrivatisationPage />} path="privatisation" />
        <Route element={<ReservationPage />} path="reservation" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<ReviewsPage />} path="reviews" />
        <Route element={<RedirectToVote />} path="vote" />
        <Route key={"menu"} element={<Menu />} path="menu/*" />
        <Route element={<MenuBrunch />} path="brunch/*" />
        <Route element={<MentionsLegalesPage />} path="mentions-legales" />
        <Route element={<PolitiqueConfidentialitePage />} path="politique-de-confidentialite" />
        <Route element={<PolitiqueCookiesPage />} path="politique-de-cookies" />
        <Route path="*" element={<div className="min-h-screen bg-padre-background flex items-center justify-center text-white"><h1 className="text-4xl font-cormorant">404 - Page introuvable</h1></div>} />
      </Route>
    </Routes>
  )
}

const LangWrapper = ({ lang }: { lang: SupportedLanguages }) => {
  return (
    <I18nProvider initialLanguage={lang}>
      <ReservationProvider>
        <AppRoutes />
        <LanguageSwitchNotification />
      </ReservationProvider>
    </I18nProvider>
  )
}

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a]" />}>
      <Routes>
        {/* Generate routes for each supported language except default which is handled at root */}
        {Object.keys(supported_languages).map((lang) => {
          if (lang === 'fr') return null;
          return (
            <Route key={lang} path={`/${lang}/*`} element={<LangWrapper lang={lang as SupportedLanguages} />} />
          )
        })}
        {/* Default route (French) handles root and everything else not matched above */}
        <Route path="/*" element={<LangWrapper lang="fr" />} />
      </Routes>
    </Suspense>
  );
}

export default App;
