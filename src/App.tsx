import {
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ReactGA from "react-ga4";

const Menu = lazy(() => import("./pages/menu/menu").then(module => ({ default: module.Menu })));
const MenuBoissons = lazy(() => import("./pages/menu/boissons").then(module => ({ default: module.MenuBoissons })));
import { I18nProvider } from "./hooks/useTranslations";
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

function App() {
  return (
    <I18nProvider>
      <ReservationProvider>
        <Suspense fallback={<div className="min-h-screen bg-[#1a1a1a]" />}>
          <Routes>
            <Route element={<RouteWrapper />}>
              <Route key={"/"} element={<IndexPage />} path="/" />
              <Route element={<MenuBoissons />} path="/boissons/*" />
              <Route element={<PrivatisationPage />} path="/privatisation" />
              <Route key={"/menu/*"} element={<Menu />} path="/menu/*" />
            </Route>
          </Routes>
        </Suspense>
      </ReservationProvider>
    </I18nProvider>
  );
}

export default App;
