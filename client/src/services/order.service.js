import { axiosInstance } from "./config";

const ROUTE = "orders";

class OrderService {
  getUserSpent(userId, TOKEN) {
    return axiosInstance.get(`${ROUTE}/spent/${userId}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  addOrder(userId, order, TOKEN) {
    return axiosInstance.post(`${ROUTE}/${userId}`, order, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  getOrderById(orderId) {
    return axiosInstance.get(`${ROUTE}/${orderId}`);
  }
  getOrdersbyUser(userId, TOKEN) {
    return axiosInstance.get(`${ROUTE}/find/${userId}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  updateOrder(userId, updateOrder, TOKEN) {
    return axiosInstance.patch(
      `${ROUTE}/${userId}/${updateOrder._id}`,
      updateOrder,
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
}

export default new OrderService();
