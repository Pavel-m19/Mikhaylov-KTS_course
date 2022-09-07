import React, { useCallback } from "react";

import s from "./checkBox.module.scss";

type CheckBoxProps = {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  disabled,
  className,
  onChange,
  checked,
  ...attrs
}) => {
  const handleChanger = useCallback((param: boolean) => {
    onChange(param);
  }, []);

  return (
    <label className={s.check}>
      <input
        {...attrs}
        className={`${s.check_box} ${className ? className : ""}`}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => {
          handleChanger(e.target.checked);
        }}
      />
      <span className={s.check_box__image}></span>
    </label>
  );
};

export default React.memo(CheckBox);
