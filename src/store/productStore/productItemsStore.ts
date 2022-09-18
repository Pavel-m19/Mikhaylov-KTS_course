import apiRoutes from "config/apiRoutes";
import { ItemInfo, Option } from "config/types";
import axios from "axios";
import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";

type PrivateFields =
  | "_allProductsCount"
  | "_currentProductsItems"
  | "_isLoading"
  | "_pageNumber"
  | "_productsListFromApi"
  | "_categories"
  | "_allProductsList"
  | "_currentFilter"
  | "_searchQuery";

class ProductItemsStore {
  private _pageNumber: number = 1;
  private _isLoading: boolean = false;
  private _allProductsCount: number = 0;
  private _productsListFromApi: ItemInfo[] = [];
  private _currentProductsItems: ItemInfo[] = [];
  private _categories: Option[] = [];
  private _allProductsList: ItemInfo[] = [];
  private _currentFilter: Option[] = [];
  private _searchQuery: string = "";

  constructor() {
    makeObservable<ProductItemsStore, PrivateFields>(this, {
      _currentFilter: observable.ref,
      _allProductsList: observable.ref,
      _categories: observable.ref,
      _pageNumber: observable,
      _isLoading: observable,
      _currentProductsItems: observable.ref,
      _allProductsCount: observable,
      _productsListFromApi: observable.ref,
      _searchQuery: observable,
      fetchItems: action,
      selectPage: action.bound,
      search: action.bound,
      cleanSearch: action.bound,
      setFilter: action.bound,
      allProductsCount: computed,
      currentProductsItems: computed,
      isLoading: computed,
      pageNumber: computed,
      categories: computed,
    });
  }

  get allProductsCount(): number {
    return this._allProductsCount;
  }

  get currentProductsItems(): ItemInfo[] {
    return this._currentProductsItems;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get pageNumber(): number {
    return this._pageNumber;
  }

  get categories(): Option[] {
    return this._categories;
  }

  get currentFilter(): Option[] {
    return this._currentFilter;
  }
  
  get searchQuery(): string {
    return this._searchQuery
  }

  async fetchItems(pageNum: number = 1) {
    this._isLoading = true;
    const reqests = [
      axios.get(apiRoutes.productList),
      axios.get(apiRoutes.categories),
    ];

    const [itemsListResponse, categoriesListResponse] = await Promise.all(
      reqests
    );

    const tempCategories: Option[] = [];
    categoriesListResponse.data.forEach((element: string) => {
      tempCategories.push({
        key: element,
        value: element,
      });
    });
    runInAction(() => {
      this._categories = tempCategories;
      this._allProductsCount = itemsListResponse.data.length;
      this._productsListFromApi = itemsListResponse.data;
      this._allProductsList = itemsListResponse.data;
      this.search(pageNum);
      this._isLoading = false;
    });
  }

  selectPage(pageNum: number) {
    this._pageNumber = pageNum;
    this._currentProductsItems = this._allProductsList.slice(
      pageNum * 9 - 9,
      Math.min(9 * pageNum, this._allProductsCount)
    );
  }

  setFilter(selected: Option[]) {
    this._currentFilter = selected;
    this.search();
  }

  setSearchQuery(query: string) {
    this._searchQuery = query    
  }

  cleanSearch() {
    this._currentFilter = [];
    this._allProductsList = this._productsListFromApi;
    this._allProductsCount = this._productsListFromApi.length;
    this.selectPage(1);
    this._searchQuery = '';
  }

  search(pageNum: number = 1) {
    let searchResult = this._productsListFromApi.filter((elem) => {
      return (
        elem.title.toLowerCase().includes(this._searchQuery.toLowerCase()) ||
        elem.description.toLowerCase().includes(this._searchQuery.toLowerCase())
      );
    });

    const currentFilterSet = new Set(
      this._currentFilter.map((elem) => elem.key)
    );

    if (this._currentFilter.length > 0) {
      searchResult = searchResult.filter((product) => {
        return currentFilterSet.has(product.category);
      });
    }
    this._allProductsList = searchResult;
    this._allProductsCount = this._allProductsList.length;
    this.selectPage(pageNum);
  }
}

export default ProductItemsStore;
