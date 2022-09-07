import React from "react";

import Loader from "components/Loader";
import classNames from "classnames";

import s from "./button.module.scss";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  loading?: boolean;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
  loading,
  color = ButtonColor.primary,
  ...attrs
}) => {
  let btnClasses = classNames(
    s.button,
    className,
    { button_disabled: disabled || loading },
    `button_color-${color}`
  );

  return (
    <button
      {...attrs}
      className={btnClasses}
      onClick={!disabled && !loading ? onClick : () => {}}
      disabled={disabled || loading}
    >
      {children}
      {loading && <Loader />}
    </button>
  );
};
export default React.memo(Button);
