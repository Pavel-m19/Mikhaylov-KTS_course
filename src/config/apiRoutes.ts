export const apiRoutes = {
  productList: "https://fakestoreapi.com/products",
  singleProduct: (id: number) => `https://fakestoreapi.com/products/${id}`,
  categories: "https://fakestoreapi.com/products/categories",
};

export default apiRoutes;
