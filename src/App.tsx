import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useCallback, useEffect } from "react";

import { Menu } from "./pages/menu/menu";
import {
  I18nProvider,
  SupportedLanguages,
  useI18n,
} from "./hooks/useTranslations";
import { LanguageSelectorModal } from "./components/LanguageSelector";
import { MenuBoissons } from "./pages/menu/boissons";

import IndexPage from "@/pages/index";

const RouteWrapper = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setLanguage } = useI18n();

  const onSelectLanguage = useCallback((lang: SupportedLanguages) => {
    setLanguage(lang);
    navigate("/");
  }, []);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  if (pathname.match(/\/menu\/?$/)) {
    return <LanguageSelectorModal isOpen onSelectLanguage={onSelectLanguage} />;
  }

  return <Outlet />;
};

function App() {
  return (
    <I18nProvider>
      <Routes>
        <Route element={<RouteWrapper />}>
          <Route key={"/"} element={<IndexPage />} path="/" />
          <Route element={<MenuBoissons />} path="/boissons/*" />
          <Route key={"/menu/*"} element={<Menu />} path="/menu/*" />
        </Route>
      </Routes>
    </I18nProvider>
  );
}

export default App;
