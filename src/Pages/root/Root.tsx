import React from "react";

import routes from "config/routes";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "@loadable/component";

import Header from "./Header/Header";
import s from "./Root.module.scss";
import WithLoader from "components/WithLoader";

const WrappedIndexPage = lazy(() => import("pages/IndexPage"));
const WrappedProduct = lazy(() => import("pages/Product"));

const Root = () => {
  return (
    <BrowserRouter>
      <div className={s.app_wrapper}>
        <Header />
        <div className={s.app_content}>
          <Routes>
            <Route
              path={routes.products}
              element={
                <React.Suspense fallback={<WithLoader loading={true} />}>
                  <WrappedIndexPage />
                </React.Suspense>
              }
            />
            <Route
              path={routes.productPage}
              element={
                <React.Suspense fallback={<WithLoader loading={true} />}>
                  <WrappedProduct />
                </React.Suspense>
              }
            />
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
