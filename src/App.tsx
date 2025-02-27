import { Route, Routes } from "react-router-dom";

import { Menu } from "./pages/menu/menu";

import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      {/* <Route element={<MenuBoissons />} path="/menu/boissons/*" /> */}
      <Route element={<Menu />} path="/menu/*" />
    </Routes>
  );
}

export default App;
