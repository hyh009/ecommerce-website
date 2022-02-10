const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    title: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
    },
    desc: {
      type: String,
      minlength: 10,
      maxlength: 150,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    imgs: {
      type: [
        {
          src: { type: String, required: true },
          desc: { type: String },
        },
      ],
      required: true,
    },
    categories: {
      type: String,
      enum: [
        "隨你PAD吸管",
        "環保無痕窗貼",
        "矽膠小餐墊",
        "蜂巢坐靠墊",
        "不倒翁門擋",
        "矽膠鍋墊",
      ],
      required: true,
    },
    colors: {
      type: [{ name: { type: String }, code: { type: String } }],
      default: [],
    },
    patterns: {
      type: [String],
      default: [],
    },
    notice: {
      type: [String],
      maxlength: 5,
      default: [],
    },
    like: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
