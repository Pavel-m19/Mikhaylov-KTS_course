import React, { useCallback } from "react";

import s from "components/Input/input.module.scss";
import classNames from "classnames";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  className,
  disabled,
  placeholder,
}) => {
  const inputClasses: string = React.useMemo(
    () =>
      classNames(s.input, className, {
        input_disabled: disabled,
      }),
    [className]
  );

  const handleChanger = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange]
  );

  return (
    <input
      placeholder={placeholder}
      disabled={disabled}
      type="text"
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={handleChanger}
      className={inputClasses}
    />
  );
};
export default React.memo(Input);
