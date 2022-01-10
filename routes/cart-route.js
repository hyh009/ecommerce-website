const router = require("express").Router();
const Cart = require("../models").cartModel;

// middleware
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Get all
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Create
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const savedcart = await newCart.save();
    res.status(200).json(savedcart);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//
router.post("/add/:id", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.id;
  try {
    let cart = await Cart.findOne({ userId });
    cart.products.push(req.body.product);
    cart.quantity += req.body.quantity; //cart quantity
    cart.total += req.body.total; // cart total
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Update all
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      {
        $set: req.body,
      },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(200).json(`成功刪除購物車`);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

module.exports = router;
