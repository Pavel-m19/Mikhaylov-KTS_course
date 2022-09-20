import React, { useCallback, useEffect } from "react";

import Button from "components/Button";
import Input from "components/Input/Input";
import MultiDropdown from "components/MultiDropdown";
import filterIcon from "assets/pics/filter.png";
import searchIcon from "assets/pics/search-normal.png";
import ProductItemsStore from "store/productStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import s from "./IndexPage.module.scss";
import ItemsList from "./ItemsList/ItemsList";
import CurrentCategories from "./currentCategories";

const pageQueryParam = "page";
const searchQueryParam = "search";
const defaultPageNumber = "1";

const IndexList = () => {
  const optionsListName = useCallback(() => {
    return `category${productsItemsStore.currentFilter.length !== 0 ?
      ` :${productsItemsStore.currentFilter.length}` :
      ''}`
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const productsItemsStore = useLocalStore(() => new ProductItemsStore());

  const pageNum: string | null =
    searchParams.get(pageQueryParam) || defaultPageNumber;

  const onEnterClickSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      startSearch();
    }
  };

  const selectPage = useCallback(
    (pageNum: number) => {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: String(pageNum),
      });
      const topCoordinate = document.querySelector(`.${s.cards__wrapper}`)?.getBoundingClientRect().top
      window.scrollTo(0, topCoordinate ? topCoordinate + window.pageYOffset + 100  : 100);
    },
    [pageNum, searchParams]
  );

  const cleanSearch = useCallback(() => {
    setSearchParams({ page: defaultPageNumber });
    productsItemsStore.cleanSearch();
  }, []);

  const searchHandleChange = useCallback((e: string) => {
    productsItemsStore.setSearchQuery(e);
  }, []);

  const startSearch = useCallback(() => {
    setSearchParams({
      page: defaultPageNumber,
      search: productsItemsStore.searchQuery,
    });
  }, []);

  const handleSearchFocus = () => {
    document.body.addEventListener("keydown", onEnterClickSearch);
  };

  const handleSearchBlur = () => {
    document.body.removeEventListener("keydown", onEnterClickSearch);
  };

  useEffect(() => {
    productsItemsStore.fetchItems(Number(pageNum));
    productsItemsStore.setSearchQuery(searchParams.get(searchQueryParam) ?? "");
  }, []);

  useEffect(() => {
    productsItemsStore.setSearchQuery(searchParams.get(searchQueryParam) ?? "")
    productsItemsStore.search(Number(pageNum));
  }, [searchParams]);

  return (
    <div>
      <div className={s.cards__wrapper}>
        <div className={s.cards__description}>
          <div className={s.cards__description__title}>Products</div>
          <div className={s.cards__description__text}>
            We display products based on the latest products we have, if you
            want to see our old products please enter the name of the item
          </div>
        </div>
        <div className={s.card_search__search_block}>
          <div className={s.card_search__area}>
            <img
              className={s.card_search__area_icon}
              src={searchIcon}
              alt="search"
            />
            <Input
              value={productsItemsStore.searchQuery}
              placeholder="search property"
              onChange={searchHandleChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className={s.card_search__area__input}
            />
            {productsItemsStore.searchQuery && (
              <div
                className={s.card_search__area__cleaner}
                onClick={cleanSearch}
              >
                X
              </div>
            )}
            <Button onClick={startSearch} disabled={productsItemsStore.searchQuery === ''}>Find now</Button>
          </div>
          <div className={s.card_search__filter}>
            <MultiDropdown
              options={productsItemsStore.categories}
              value={productsItemsStore.currentFilter}
              pluralizeOptions={optionsListName}
              onChange={productsItemsStore.setFilter}
              className={s.card_search__filter__button}
            >
              <img
                className={s.card_search__filter__icon}
                src={filterIcon}
                alt="filter"
              />
            </MultiDropdown>
          </div>
        </div>
        <CurrentCategories
          curretCategories={productsItemsStore.currentFilter}
          onChange={productsItemsStore.setFilter} />

        <ItemsList
          currentProductsItems={productsItemsStore.currentProductsItems}
          productsCount={productsItemsStore.allProductsCount}
          pageNumber={productsItemsStore.pageNumber}
          selectPage={selectPage}
          isLoading={productsItemsStore.isLoading}
        />
      </div>
    </div>
  );
};

export default observer(IndexList);
