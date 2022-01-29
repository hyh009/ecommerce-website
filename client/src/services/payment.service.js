import { axiosInstance } from "./config";
const ROUTE = "payment";

class PaymentService {
  linepayPost(orderDetail, TOKEN) {
    const packages = createLinePackages(orderDetail);
    const order = {
      amount: orderDetail.amount + orderDetail.shipping,
      currency: "TWD",
      orderId: orderDetail._id,
      packages: packages,
      // redirectUrls: {
      //   confirmUrl: "http://localhost:3000/payment/confirm",
      //   cancelUrl: "http://localhost:3000/payment/cancel",
      // },
      redirectUrls: {
        confirmUrl:
          "https://hsinyaoecommercewebsite.herokuapp.com/payment/confirm",
        cancelUrl:
          "https://hsinyaoecommercewebsite.herokuapp.com/payment/cancel",
      },
    };

    return axiosInstance.post(
      `${ROUTE}/linepay/${orderDetail.user}`,
      { order },
      {
        headers: { token: `Bearer ${TOKEN}` },
      }
    );
  }
  linepayConfirm(transactionId, order, TOKEN) {
    const amountAndCurrency = {
      amount: order.amount + order.shipping,
      currency: "TWD",
    };
    return axiosInstance.post(
      `${ROUTE}/linepay/confirm/${order.user}`,
      { transactionId, amountAndCurrency },
      { headers: { token: `Bearer ${TOKEN}` } }
    );
  }
}

export default new PaymentService();

//For Line
const createLinePackages = (orderDetail) => {
  let packages = [];
  for (let i = 1; i <= orderDetail.products.length; i++) {
    packages.push({
      id: i,
      amount: orderDetail.products[i - 1].amount,
      products: [
        {
          id: orderDetail.products[i - 1]._id,
          name: `${orderDetail.products[i - 1].title} - ${
            orderDetail.products[i - 1].color
          }${orderDetail.products[i - 1].pattern}`,
          imageUrl: orderDetail.products[i - 1].imgUrl,
          quantity: orderDetail.products[i - 1].quantity,
          price: orderDetail.products[i - 1].price,
        },
      ],
    });
  }
  //add shipping fee
  packages.push({
    id: orderDetail.products.length + 1,
    amount: orderDetail.shipping,
    products: [
      {
        id: 0,
        name: "運費",
        quantity: 1,
        imageUrl:
          "https://res.cloudinary.com/dh2splieo/image/upload/v1643035258/shop_website/imgs/24296403_dkqscf.jpg",
        price: orderDetail.shipping,
      },
    ],
  });
  return packages;
};
