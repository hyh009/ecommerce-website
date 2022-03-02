import { axiosInstance } from "./config";
const ROUTE = "carts";

class CartService {
  get(user_Id, TOKEN) {
    return axiosInstance.get(`${ROUTE}/find/${user_Id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  update(user_Id, products, quantity, total, TOKEN) {
    return axiosInstance.put(
      `${ROUTE}/${user_Id}`,
      { products, quantity, total },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
}

export default new CartService();
