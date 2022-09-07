export const routes = {
  products: "/",
  productPage: "/product/:id",
  services: "/servises",
  articles: "/articles",
  about: "/about",
  bag: "/bag",
  cabinet: "/cabinet",
  createProoductPath: (id: number) => `/product/${id}`,
};

export default routes;
