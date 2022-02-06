import { axiosInstance } from "./config";

const ROUTE = "orders";

class OrderService {
  addOrder(userId, order, TOKEN) {
    return axiosInstance.post(`${ROUTE}/${userId}`, order, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  //get income
  getIncome(year, TOKEN, month) {
    return axiosInstance.get(`${ROUTE}/income?year=${year}&month=${month}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  getSales(productId, year, TOKEN) {
    return axiosInstance.get(`${ROUTE}/income?pid=${productId}&year=${year}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  // get user spent
  getUserSpent(userId, TOKEN) {
    return axiosInstance.get(`${ROUTE}/spent/${userId}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  // get all order
  get(TOKEN) {
    return axiosInstance.get(`${ROUTE}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  get5NewOrders(TOKEN) {
    return axiosInstance.get(`${ROUTE}?new=true`, {
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
