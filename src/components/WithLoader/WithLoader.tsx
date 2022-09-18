import React from "react";

import Loader from "components/Loader";
import { LoaderSize } from "components/Loader/Loader";
import s from "./WhithLoader.module.scss";

type WithLoaderProps = {
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
  ...args
}) => {
  return (
    <div {...args} className={s.whith_loader}>
      {loading !== true && children}
      {loading && <Loader size={LoaderSize.l} />}
    </div>
  );
};

export default React.memo(WithLoader);
