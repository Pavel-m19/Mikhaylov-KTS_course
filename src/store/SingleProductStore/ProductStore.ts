import apiRoutes from "config/apiRoutes";
import { ItemInfo } from "config/types";
import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

type PrivateFields = "_productData" | "_isLoading";

export class ProductStore {
  private _productData: ItemInfo | null = null;
  private _isLoading: boolean = false;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      _isLoading: observable,
      _productData: observable.ref,
      fetchItem: action,
      productData: computed,
      isLoading: computed,
    });
  }

  async fetchItem(id: number) {
    this._isLoading = true;
    const productApiResponse = await axios({
      method: "get",
      url: apiRoutes.singleProduct(id),
    });
    this._productData = productApiResponse.data;
    this._isLoading = false;
  }

  get productData(): ItemInfo | null {
    return this._productData;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }
}

export default ProductStore;
