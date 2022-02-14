import { axiosInstance } from "./config";
const ROUTE = "payment";

class PaymentService {
  linepayPost(orderDetail, TOKEN) {
    return axiosInstance.post(
      `${ROUTE}/linepay/${orderDetail.user}`,
      { order: orderDetail },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
  linepayConfirm(transactionId, order, TOKEN) {
    return axiosInstance.post(
      `${ROUTE}/linepay/confirm/${order.user}`,
      { transactionId, order },
      { headers: { token: `Bearer ${TOKEN}` } }
    );
  }

  paypalRequest(userId, order, TOKEN) {
    return axiosInstance.post(
      `${ROUTE}/paypal/createOrder/${userId}`,
      { order },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }

  paypalCapture(order, TOKEN) {
    return axiosInstance.post(
      `${ROUTE}/paypal/captureOrder/${order.user}`,
      { order },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
}

export default new PaymentService();
