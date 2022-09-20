import React, { useCallback } from "react";
import { Option } from "config/types";

import s from './CurrentCategories.module.scss'

export type CategoriesProps = {
    curretCategories: Option[];
    onChange: (value: Option[]) => void;
}

const CurrentCategories: React.FC<CategoriesProps> = ({ curretCategories, onChange }) => {

    const handleCloseClick = useCallback((e: Option) => {
        let selected = [...curretCategories];

        for (let i = 0; i < selected.length; i++) {
            if (selected[i].key === e.key) {
                selected.splice(i, 1);
            }
        }
        onChange(selected);
    }, [curretCategories, onChange])

    return <div className={s.current_categories}>
        {curretCategories.map((e: Option) => (
            <div className={s.current_categories__item} key={e.key}>
                <div className={s.current_categories__category_name}>{e.value}</div>
                <div className={s.current_categories__close_button}
                    onClick={() => handleCloseClick(e)}>x</div>
            </div>))}
    </div>

}

export default CurrentCategories