import {
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ReactGA from "react-ga4";

import { LanguageSwitchNotification } from "./components/LanguageSwitchNotification";

const Menu = lazy(() => import("./pages/menu/menu").then(module => ({ default: module.Menu })));
const MenuBoissons = lazy(() => import("./pages/menu/boissons").then(module => ({ default: module.MenuBoissons })));
import { I18nProvider, SupportedLanguages, supported_languages } from "./hooks/useTranslations";
import { ReservationProvider } from "@/context/ReservationContext";

const IndexPage = lazy(() => import("@/pages/index"));
const PrivatisationPage = lazy(() => import("@/pages/privatisation"));

ReactGA.initialize("G-VH1QHTSLEM");

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
        <Route key={"menu"} element={<Menu />} path="menu/*" />
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
