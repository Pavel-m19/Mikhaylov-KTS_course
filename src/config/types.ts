//карточки в списке товаров
export type RatingType = {
  rate: number;
  count: number;
};

export type ItemInfo = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
};

export type ItemsListType = {
  currentProductsItems: ItemInfo[];
  productsCount: number;
  pageNumber: number;
  selectPage: (num: number) => void;
  isLoading: boolean;
};

export type Option = {
  key: string;
  value: string;
};

