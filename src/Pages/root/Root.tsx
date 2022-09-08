import React from "react";

import routes from "config/routes";


import Product from "Pages/Product";
import IndexPage from "Pages/IndexPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "../root/Header/Header";
import s from "./Root.module.scss";

const Root = () => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <div className={s.app_content}>
          <Routes>
            <Route path={routes.products} element={<IndexPage />} />
            <Route path={routes.productPage} element={<Product />} />
            <Route
              path="*"
              element={<Navigate to={routes.products} replace />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default React.memo(Root);
