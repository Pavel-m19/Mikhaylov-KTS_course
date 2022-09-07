import React, { useCallback, useMemo, useState } from "react";

import s from "@components/MultiDropdown/MultiDropDown.module.scss";
import { Option } from "config/types";
import classNames from "classnames";

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
  className?: string;
  children?: React.ReactNode;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
  children,
  ...attrs
}) => {
  const [dropDownState, setDropDownState] = useState(false);

  const handleClick = useCallback(() => {
    setDropDownState((prev) => !prev);
  }, []);

  const selectedKeysSet = useMemo(
    () => new Set(value.map((elem) => elem.key)),
    [value]
  );

  const filtrator = useCallback(
    (e: Option) => {
      let flag: boolean = true;
      let selected = [...value];

      for (let i = 0; i < selected.length; i++) {
        if (selected[i].key === e.key) {
          selected.splice(i, 1);
          flag = false;
        }
      }
      if (flag) {
        selected.unshift({ key: e.key, value: e.value });
      }
      onChange(selected);
    },
    [value, onChange]
  );

  return (
    <div
      {...attrs}
      className={classNames(s.multi_drop_down_wrapper, className)}
    >
      <div className={s.multi_drop_down_title} onClick={handleClick}>
        {children}
        {pluralizeOptions(value)}
      </div>

      {dropDownState && !disabled && (
        <div className={s.multi_drop_down_varians_wrapper}>
          {options.map((e) => (
            <div
              className={classNames(
                s.multi_drop_down_variant,
                selectedKeysSet.has(e.key) && s.selected
              )}
              onClick={() => {
                filtrator(e);
              }}
              key={e.key}
            >
              {`${e.value}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
