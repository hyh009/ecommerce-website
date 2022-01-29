const router = require("express").Router();
const uuid = require("uuid4");
const crypto = require("crypto-js");
const axios = require("axios");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

const baseUrl = "http://sandbox-api-pay.line.me";
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

// payment request
router.post("/linepay/:id", verifyTokenAndAuthorization, async (req, res) => {
  // generate object id here
  const order = req.body.order;
  const nonce = uuid();
  const requestUri = "/v3/payments/request";
  const hamcBase64 = createSignature(order, nonce, requestUri);
  const configs = createRequestConfig(hamcBase64, nonce);
  try {
    const response = await axios.post(
      `${baseUrl}${requestUri}`,
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

// payment confirm

router.post(
  "/linepay/confirm/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const { amountAndCurrency, transactionId } = req.body;
    const nonce = uuid();
    const confirmUri = `/v3/payments/${transactionId}/confirm`;
    const hamcBase64 = createSignature(amountAndCurrency, nonce, confirmUri);
    const configs = createRequestConfig(hamcBase64, nonce);

    try {
      const response = await axios.post(
        `${baseUrl}${confirmUri}`,
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

// //Refund
// const key = process.env.LINEPAY_KEY;
// const nonce = uuid();
// const requestUrl = `/v3/payments/${transactionId}/refund`;
// const refundAmount = {
//   amount: { refundAmount }, //可以部份退款
// };

module.exports = router;
