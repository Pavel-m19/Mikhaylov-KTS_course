import { useCallback, useEffect } from "react";
import React from "react";

import Button from "components/Button";
import WithLoader from "components/WithLoader";
import routes from "config/routes";
import ProductStore from "store/SingleProductStore/ProductStore";
import classNames from "classnames";
import { observer, useLocalStore } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";

import s from "./Product.module.scss";
import Loader from "components/Loader";

const Product = () => {
  const productDataStore = useLocalStore(() => new ProductStore());
  const productId: number | undefined = Number(useParams().id);

  //выбор цвета квадратика для рейтинга товара
  const ratingColorChoiser = useCallback((rating: number): string => {
    rating = Math.floor(rating);
    switch (rating) {
      case 4: {
        return "green";
      }
      case 3: {
        return "rgb(226, 226, 6)";
      }
      case 2: {
        return "orange";
      }
      case 1: {
        return "red";
      }
      default:
        return "grey";
    }
  }, []);

  useEffect(() => {
    productDataStore.fetchItem(productId);
  }, []);

  if (!productId || isNaN(productId)) {
    return <Navigate to={routes.products} replace />;
  }

  if (!productDataStore.productData && !productDataStore.isLoading) {
    return <div className={s.product_failure_massage}>Product not found :(</div>
  }

  return (
    <WithLoader loading={productDataStore.isLoading}>
      {productDataStore.productData && (
        <div className={s.product}>
          <img src={productDataStore.productData.image} alt="pic" />
          <div className={s.product__info}>
            <div className={s.product__info__title}>
              {productDataStore.productData.title}
            </div>
            <div className={s.product__info__category}>
              {productDataStore.productData.category}
            </div>
            <div className={s.product__info__rating}>
              <div
                className={s.product__info_rating__box}
                style={{
                  backgroundColor: `${ratingColorChoiser(
                    productDataStore.productData.rating.rate
                  )}`,
                }}
              ></div>
              <div>Rating: {productDataStore.productData.rating.rate}</div>
            </div>
            <div className={s.product__info__count}>
              Count: {productDataStore.productData.rating.count}
            </div>
            <div className={s.product__info__description}>
              {productDataStore.productData.description}
            </div>
            <div className={s.product__info__price}>
              {productDataStore.productData.price}$
            </div>
            <div className={s.product__info__buttons}>
              <Button className={s.product__info__buttons__cart_button}>
                Buy Now
              </Button>
              <Button
                className={classNames(
                  s.product__info__buttons__cart_button,
                  s.white
                )}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </WithLoader>
  );
};

export default observer(Product);
