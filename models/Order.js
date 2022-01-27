const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: {
          type: String,
        },
        pattern: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        amount: {
          type: Number,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    recevier: { type: String, required: true },
    status: {
      type: String,
      enum: [
        "待付款",
        "訂單處理中",
        "商品已寄出",
        "商品已送達",
        "訂單取消",
        "訂單退款",
      ],
      default: "待付款",
    },
    shipping: { type: Number, required: true },
    payment: {
      method: { type: String, enum: ["linepay", "creditcard"] },
      status: {
        type: String,
        enum: ["待付款", "已付款", "付款失敗", "已退款", "已取消"],
        default: "待付款",
      },
      transactionId: { type: Number },
      paymentAccessToken: { type: String },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
