import React from "react";

import s from "components/Loader/Loader.module.scss";
import classNames from "classnames";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  className,
  size = LoaderSize.m,
  loading,
  ...attrs
}) => {
  let loaderClasses = classNames(s[size], className);

  return loading !== false ? (
    <svg {...attrs} className={loaderClasses}>
      <circle className={loaderClasses}></circle>
    </svg>
  ) : null;
};
export default React.memo(Loader);
