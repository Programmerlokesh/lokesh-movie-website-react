import React from "react";
import { Route, Routes } from "react-router-dom";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Home from "../pages/Home";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
};

export default ConfigRoutes;
