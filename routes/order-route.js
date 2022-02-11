const router = require("express").Router();
const Order = require("../models").orderModel;
const mongoose = require("mongoose");

// middleware
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

// Get monthly income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  // set request year range
  const queryYear = parseInt(req.query.year);
  let start;
  let end;
  let queryMonth = parseInt(req.query.month);
  if (queryMonth) {
    // if month in the query get latest 2 month data
    if (queryMonth - 2 < 0) {
      queryMonth = queryMonth + 12;
      start = new Date(queryYear - 1, queryMonth - 2, 1);
      end = new Date();
    } else {
      start = new Date(queryYear, queryMonth - 2, 1);
      end = new Date();
    }
  } else {
    start = new Date(queryYear, 0, 1);
    end = new Date(queryYear + 1, 0, 1);
  }
  try {
    const income = await Order.aggregate([
      {
        $match: {
          status: { $nin: ["待付款", "訂單取消", "訂單退款"] },
          createdAt: { $gte: start, $lt: end },
          ...(productId && {
            products: {
              $elemMatch: { _id: { $eq: mongoose.Types.ObjectId(productId) } },
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
      { $sort: { _id: 1 } }, // 1 for ascending
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
          status: { $nin: ["待付款", "訂單取消", "訂單退款"] },
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
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);
    res.status(200).json(spent);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Get order by id
router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId).populate("products._id", [
      "title",
      "imgs",
      "price",
    ]);

    const flatenProduct = order._doc.products.map((product) => {
      return {
        ...product._doc,
        _id: product._id._id,
        imgUrl: product._id.imgs[0].src,
        title: product._id.title,
        price: product._id.price,
      };
    });
    res.status(200).json({ ...order._doc, products: flatenProduct });
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Get user orders
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.params.id,
      status: { $nin: ["待付款"] },
    }).populate("products._id", ["title", "imgs", "price"]);

    const flatenOrders = orders.map((order) => {
      const flatenProduct = order.products.map((product) => {
        return {
          ...product._doc,
          _id: product._id._id,
          imgUrl: product._id.imgs[0].src,
          title: product._id.title,
          price: product._id.price,
        };
      });
      return { ...order._doc, products: flatenProduct };
    });

    res.status(200).json(flatenOrders);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Get all user orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const query = req.query.new;
    const orders = query
      ? await Order.find({})
          .populate("user", ["img", "username"])
          .sort({ _id: -1 })
          .limit(5) //return five newest order
      : await Order.find({}).populate("user", ["img", "username"]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Create
router.post("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Update
router.patch("/:id/:orderId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      req.body,
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

module.exports = router;
