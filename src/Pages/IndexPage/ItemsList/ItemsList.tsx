import React from "react";

import Card from "components/Card";
import routes from "config/routes";
import { ItemInfo, ItemsListType } from "config/types";

import { Link } from "react-router-dom";

import Paginator from "../Paginator";
import s from "./ItemsList.module.scss";
import WithLoader from "components/WithLoader";

const countDefaultValue = "wait...";

const ItemsList: React.FC<ItemsListType> = ({
  productsCount,
  currentProductsItems,
  pageNumber,
  selectPage,
  isLoading,
}) => {
  return (
    <div className={s.items_list_wrapper}>

      <div>
        <div className={s.card__product_count}>
          <div>Total Product</div>
          <span className={s.card__product_count__number}>
            {!isLoading ? productsCount : countDefaultValue}
          </span>
        </div>
        <WithLoader loading={isLoading}>
          <div className={s.products_list__wrapper}>
            {currentProductsItems.map((elem: ItemInfo) => (
              <Link to={routes.createProoductPath(elem.id)} 
              className={s.single_card__wrapper}>
                <Card
                  image={elem.image}
                  category={elem.category}
                  title={elem.title}
                  id={elem.id}
                  price={elem.price}
                  key={elem.id}
                />
              </Link>
            ))}
          </div>
        </WithLoader>
      </div>
      {productsCount > 9 && (
        <Paginator
          pageNumber={pageNumber}
          itemsCount={productsCount}
          selectPage={selectPage}
        />
      )}
    </div>

  );
};

export default React.memo(ItemsList);
