const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        title: {
          type: String,
        },
        color: {
          type: Object,
        },
        pattern: {
          type: String,
        },
        img: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        subtotal: {
          type: Number,
        },
      },
    ],
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
