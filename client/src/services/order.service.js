import { axiosInstance } from "./config";

const ROUTE = "orders";

class OrderService {
  getUserSpent(userId, TOKEN) {
    return axiosInstance(`${ROUTE}/spent/${userId}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
}

export default new OrderService();

// const order = {
//   amount: order.amount,
//   currency: "TWD",
//   orderId: order._id,
//   packages: [
//       {
//           id: order.products[].category,
//           amount: ,
//           name: ,
//           products: [
//             name:,
//             quantity:,
//             price:,
//           ]
//       }
//   ],
//   redirectUrls: {
//     confrimUrl: `${API_URL}/confirm`,
//     cancelUrl: `${API_URL}/cancel`,
//   },
// };
