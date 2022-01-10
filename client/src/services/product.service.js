import { axiosInstance } from "./config";
const ROUTE = "products";

class ProductService {
  //Read
  getAll(category) {
    return typeof category === "undefined" || category === "all"
      ? axiosInstance.get(ROUTE)
      : axiosInstance.get(`${ROUTE}?category=${category}`);
  }

  get(productId) {
    return axiosInstance.get(`${ROUTE}/find/${productId}`);
  }
}
export default new ProductService();
