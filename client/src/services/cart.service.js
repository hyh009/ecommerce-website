import { axiosInstance } from "./config";
import { getTOKEN } from "./TokenValidation";
const ROUTE = "carts";

class CartService {
  get(user_Id, TOKEN) {
    return axiosInstance.get(`${ROUTE}/find/${user_Id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  update(user_Id, products, quantity, total, TOKEN) {
    if (!TOKEN) {
      const TOKEN = getTOKEN();
    }
    return axiosInstance.put(
      `${ROUTE}/${user_Id}`,
      { products, quantity, total },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }

  create(user_Id, product) {
    const TOKEN = getTOKEN();
    return axiosInstance.post(
      `${ROUTE}/${user_Id}`,
      {
        userId: user_Id,
        products: [product],
        quantity: 1,
        total: product.subtotal,
      },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }

  addNewProduct(user_Id, product) {
    const TOKEN = getTOKEN();
    return axiosInstance.post(
      `${ROUTE}/add/${user_Id}`,
      {
        userId: user_Id,
        product,
        quantity: 1,
        total: product.subtotal,
      },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
}

export default new CartService();
