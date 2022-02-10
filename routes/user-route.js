const router = require("express").Router();
const User = require("../models").userModel;
const bcrypt = require("bcrypt");
const {
  updateUserValidation,
  updatePasswordValidation,
} = require("../validation");
// middleware
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./validation-token");

const { cloudinary } = require("../config/cloudinary");

//Get all user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find({}).sort({ _id: -1 }).limit(5) //return five newest user
      : await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Get user
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Get user stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  // set request year range
  const queryYear = parseInt(req.query.year);
  const start = new Date(queryYear, 0, 1);
  const end = new Date(queryYear + 1, 0, 1);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: start, $lt: end } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, // get everything from req.body
      },
      { new: true }
    ); // return updated data
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// Update password
router.patch("/:id/password", verifyTokenAndAuthorization, async (req, res) => {
  const { error } = updatePasswordValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      password: hash,
    }); // return updated data
    const { password: hashpassword, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// Patch
router.patch("/:id", verifyTokenAndAuthorization, async (req, res) => {
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  if (req.body.email) {
    const emailExist = await User.findOne({ email: req.body.email });
    console.log(emailExist);
    if (emailExist && !emailExist._id.equals(req.params.id))
      return res.status(400).json("此Email已註冊帳號。");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("系統發生錯誤，請稍候再試。");
    console.log(err);
  }
});

// Delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("成功刪除此用戶。");
  } catch (err) {
    res.status(500).json("系統發生錯誤，請稍候再試。");
    console.log(err);
  }
});

// Upload image to cloudinary
router.post(
  "/uploadImage/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { fileString, fileName } = req.body;
      const data = await cloudinary.uploader.upload(fileString, {
        public_id: `shop_website/user/${fileName}`,
      });
      res.status(200).json(data.secure_url);
    } catch (err) {
      console.log(err);
      res.status(500).json("系統發生問題，請稍候再試");
    }
  }
);

module.exports = router;
