const router = require("express").Router();
const uuid = require("uuid4");
const crypto = require("crypto-js");
const axios = require("axios");
const paypal = require("@paypal/checkout-server-sdk");
const Environment = paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRECT)
);

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

const COMFIRM_URL = "http://localhost:3000/payment/confirm";
const CANCEL_URL = "http://localhost:3000/payment/cancel";

// const COMFIRM_URL = "https://hsinyaoecommercewebsite.herokuapp.com/payment/confirm";
// const CANCEL_URL =  "https://hsinyaoecommercewebsite.herokuapp.com/payment/cancel";

// LINE Pay
const linePayBaseUrl = "https://sandbox-api-pay.line.me";
const key = process.env.LINEPAY_SECRET;

// Signature = Base64(HMAC-SHA256(Your ChannelSecret, (Your ChannelSecret + URL Path + RequestBody + nonce)))
function createSignature(order, nonce, Uri) {
  const message = key + Uri + JSON.stringify(order) + nonce;
  const hash = crypto.HmacSHA256(message, key);
  const hmacBase64 = crypto.enc.Base64.stringify(hash);
  return hmacBase64;
}
function createRequestConfig(hmacBase64, nonce) {
  const configs = {
    headers: {
      "Content-Type": "application/json",
      "X-LINE-ChannelId": process.env.LINEPAY_CHANNEL_ID,
      "X-LINE-Authorization-Nonce": nonce,
      "X-LINE-Authorization": hmacBase64,
    },
  };
  return configs;
}

// linepay payment request
router.post("/linepay/:id", verifyTokenAndAuthorization, async (req, res) => {
  const orderDetail = req.body.order;
  const packages = createLinePackages(orderDetail);

  const order = {
    amount: orderDetail.amount + orderDetail.shipping,
    currency: "TWD",
    orderId: orderDetail._id,
    packages: packages,
    redirectUrls: {
      confirmUrl: COMFIRM_URL,
      cancelUrl: CANCEL_URL,
    },
  };

  const nonce = uuid();
  const requestUri = "/v3/payments/request";
  const hamcBase64 = createSignature(order, nonce, requestUri);
  const configs = createRequestConfig(hamcBase64, nonce);
  try {
    const response = await axios.post(
      `${linePayBaseUrl}${requestUri}`,
      order,
      configs
    );
    res.status(200).json({
      paymentUrl: response.data.info.paymentUrl.web,
      paymentUrlApp: response.data.info.paymentUrl.app,
      transactionId: response.data.info.transactionId,
      paymentAccessToken: response.data.info.paymentAccessToken,
    });
  } catch (err) {
    console.log({ err });
    res.status(500).json(err);
  }
});

// linepay payment confirm

router.post(
  "/linepay/confirm/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { order, transactionId } = req.body;
    const amountAndCurrency = {
      amount: order.amount + order.shipping,
      currency: "TWD",
    };
    const nonce = uuid();
    const confirmUri = `/v3/payments/${transactionId}/confirm`;
    const hamcBase64 = createSignature(amountAndCurrency, nonce, confirmUri);
    const configs = createRequestConfig(hamcBase64, nonce);

    try {
      const response = await axios.post(
        `${linePayBaseUrl}${confirmUri}`,
        amountAndCurrency,
        configs
      );

      if (response.data.returnCode === "0000") {
        res.status(200).json("付款成功");
        console.log(res);
      } else {
        res.status(500).json("付款失敗");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// paypal create order
router.post(
  "/paypal/createOrder/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    // create order
    const request = new paypal.orders.OrdersCreateRequest();
    const { order } = req.body;
    const total = order.amount + order.shipping;
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE", // capture the information of user
      purchase_units: [
        {
          amount: {
            currency_code: "TWD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "TWD",
                value: order.amount,
              },
              shipping: {
                currency_code: "TWD",
                value: order.shipping,
              },
            },
          },
          items: order.products.map((product) => {
            return {
              name: product.title + product.color + product.color,
              unit_amount: {
                currency_code: "TWD",
                value: product.price,
              },
              quantity: product.quantity,
            };
          }),
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    });

    // request payment
    try {
      const order = await paypalClient.execute(request);
      console.log(order);
      res.status(200).json({ id: order.result.id });
    } catch (err) {
      res.status(500).json({ error: err.message });
      console.log(err);
    }
  }
);

//For Line
const createLinePackages = (orderDetail) => {
  let packages = [];
  for (let i = 0; i < orderDetail.products.length; i++) {
    packages.push({
      id: i + 1,
      amount: orderDetail.products[i].amount,
      products: [
        {
          id: orderDetail.products[i]._id,
          name: `${orderDetail.products[i].title} - ${orderDetail.products[i].color}${orderDetail.products[i].pattern}`,
          imageUrl: orderDetail.products[i].imgUrl,
          quantity: orderDetail.products[i].quantity,
          price: orderDetail.products[i].price,
        },
      ],
    });
  }
  //add shipping fee
  packages.push({
    id: orderDetail.products.length,
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

module.exports = router;
