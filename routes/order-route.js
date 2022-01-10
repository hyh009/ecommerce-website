const router = require("express").Router();
const Order = require("../models").orderModel;
const mongoose = require("mongoose");

// middleware
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

//Get user orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Get all user orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", ["img", "username"]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Create
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(`成功刪除${deletedOrder._id}`);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// Get monthly income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: {
              $elemMatch: { productId: mongoose.Types.ObjectId(productId) },
            },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

// Get user monthly spent

router.get("/spent/:id", verifyTokenAndAuthorization, async (req, res) => {
  const userId = req.params.id;
  const firstDay = new Date(new Date().getFullYear(), 0, 1);

  try {
    const spent = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: firstDay },
          user: { $eq: mongoose.Types.ObjectId(userId) },
        },
      },
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          spent: "$amount",
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          total: { $sum: "$spent" },
        },
      },
    ]);
    res.status(200).json(spent);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

module.exports = router;
