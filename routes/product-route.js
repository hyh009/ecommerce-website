const router = require("express").Router();
const Product = require("../models").productModel;
const ObjectId = require("mongoose").Types.ObjectId;
const { productValidation, updateProductValidation } = require("../validation");
// middleware
const { verifyTokenAndAdmin } = require("./validation-token");
const { cloudinary } = require("../config/cloudinary");

//check objectId
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

//Get one
router.get("/find/:id", async (req, res) => {
  if (isValidObjectId(req.params.id)) {
    try {
      const product = await Product.findById(req.params.id);
      if (product === null) {
        res.status(404).json("查找的商品不存在");
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("系統發生問題，請稍候再試");
    }
  } else {
    res.status(404).json("查找的商品不存在");
  }
});

//Get All
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: qCategory,
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(201)
      .json({ message: `成功更新${req.body.name}`, data: updatedProduct });
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

//Update (for Admin)
router.patch("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { error } = updateProductValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
    console.log(err);
  }
});

//Deltet
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(`成功刪除${deletedProduct.name}`);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// Upload image to cloudinary
router.post("/uploadImage", verifyTokenAndAdmin, async (req, res) => {
  try {
    const { fileString, filePath, fileName } = req.body;
    const data = await cloudinary.uploader.upload(fileString, {
      public_id: `${filePath}${fileName}`,
    });
    res.status(200).json(data.secure_url);
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

module.exports = router;
