
import React, { useCallback, useMemo } from "react";


import arrowLeft from "assets/pics/arrow-left.png";
import arrowRight from "assets/pics/arrow-right.png";
import classNames from "classnames";

import s from "./Paginator.module.scss";

type paginatorTypes = {
  pageNumber: number;
  itemsCount: number;
  selectPage: (num: number) => void;

};

const Paginator: React.FC<paginatorTypes> = ({
  pageNumber,
  itemsCount,
  selectPage,
}) => {
  const pages: number[] = useMemo(
    () => Array.from(Array(Math.ceil(itemsCount / 9)).keys()),
    [itemsCount]
  );

  const handelNExtButtonClick = useCallback(() => {
    if (pageNumber < pages.length) {
      selectPage(pageNumber + 1);
    }
  }, [pageNumber, pages.length, selectPage]);

  const handelPrevButtonClick = useCallback(() => {
    if (pageNumber > 1) {
      selectPage(pageNumber - 1);
    }
  }, [pageNumber, selectPage]);

  return (
    <div className={s.card__product__paginator}>
      <img
        src={arrowLeft}
        alt="left"
        className={classNames(
          s.card__product__paginator__arrow,
          pageNumber === 1 && s.disabled
        )}
        onClick={handelPrevButtonClick}

      />
      <div className={s.card__product__paginator__pages_wrapper}>
        {pages.map((elem: number) => (
          <div
            className={classNames(
              s.card__product__paginator__page,
              elem + 1 === pageNumber && s.selected
            )}
            key={elem + 1}
            onClick={() => selectPage(elem + 1)}


          >
            {elem + 1}
          </div>
        ))}
      </div>
      <img
        src={arrowRight}
        alt="right"
        className={classNames(
          s.card__product__paginator__arrow,
          pageNumber === pages[pages.length - 1] + 1 && s.disabled
        )}
        onClick={handelNExtButtonClick}

      />
    </div>
  );
};

export default React.memo(Paginator);
