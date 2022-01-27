const Joi = require("joi");

// USER SCHEMA
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required().messages({
      "string.empty": `請輸入姓名。`,
      "string.min": `姓名最少2個字。`,
      "string.max": `姓名最多20個字。`,
      "any.required": `請輸入姓名。`,
    }),
    username: Joi.string().min(2).max(20).required().messages({
      "string.empty": `請輸入用戶名稱。`,
      "string.min": `用戶名稱最少2個字。`,
      "string.max": `用戶名稱最多20個字。`,
      "any.required": `請輸入用戶名稱。`,
    }),
    email: Joi.string().required().email().messages({
      "string.empty": `請輸入email。`,
      "string.email": `請輸入正確的email格式。`,
      "any.required": `請輸入email。`,
    }),
    gender: Joi.string().valid("男", "女", "其他", "未設定").messages({
      "any.only": "性別請從「男」、「女」、「其他」擇一或空白。",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": `請輸入密碼。`,
      "string.min": `密碼最少6個字元。`,
      "string.max": `密碼最多20個字元。`,
      "any.required": `請輸入密碼。`,
    }),
    passwordConfirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": "請再次輸入密碼。",
        "any.only": "前後輸入的密碼不相同。",
      }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": `請輸入email。`,
      "string.email": `請輸入正確的email格式。`,
      "any.required": `請輸入email。`,
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": `請輸入密碼。`,
      "string.min": `密碼最少6個字元。`,
      "string.max": `密碼最多20個字元。`,
      "any.required": `請輸入密碼。`,
    }),
  });
  return schema.validate(data);
};

const updateUserValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(20).messages({
      "string.min": `用戶名稱最少2個字。`,
      "string.max": `用戶名稱最多20個字。`,
    }),
    email: Joi.string().email().messages({
      "string.email": `請輸入正確的email格式。`,
    }),
    gender: Joi.string().valid("男", "女", "其他", "未設定").messages({
      "any.only": "性別請從「男」、「女」、「其他」擇一或空白。",
    }),
    lank: Joi.string(),
    password: Joi.string(),
    img: Joi.string(),
    name: Joi.string(),
    isAdmin: Joi.boolean(),
    like: Joi.array().items(Joi.string()),
    phone: Joi.string(),
    address: Joi.string(),
    coupon: Joi.array().items(Joi.string()),
    coverColor: Joi.string(),
    lastLogin: Joi.date(),
    _id: Joi.string(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    __v: Joi.number(),
  });
  return schema.validate(data);
};

const updatePasswordValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": `請輸入密碼。`,
      "string.min": `密碼最少6個字元。`,
      "string.max": `密碼最多20個字元。`,
      "any.required": "請輸入密碼。",
    }),
    passwordConfirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": "請再次輸入密碼。",
        "any.only": "前後輸入的密碼不相同。",
      }),
  });
  return schema.validate(data);
};

// PRODUCT SCHEMA

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
      "string.empty": `請輸入產品名稱。`,
      "string.min": `名稱最少3個字。`,
      "string.max": `名稱最多10個字。`,
      "any.required": "請輸入產品名稱。",
    }),
    title: Joi.string().min(5).max(30).required().messages({
      "string.empty": `請輸入產品顯示標題。`,
      "string.min": `標題最少5個字。`,
      "string.max": `標題最多25個字。`,
      "any.required": "請輸入產品顯示標題。",
    }),
    desc: Joi.string().min(10).max(150).required().messages({
      "string.empty": `請輸入產品描述。`,
      "string.min": `產品描述最少10個字。`,
      "string.max": `產品描述最多100個字。`,
      "any.required": "請輸入產品描述。",
    }),
    price: Joi.number().min(0).required().messages({
      "number.empty": `請輸入產品價格。`,
      "number.min": `價格最少0元。`,
      "any.required": "請輸入產品價格。",
    }),
    imgs: Joi.array().items(
      Joi.object({
        desc: Joi.string(),
        src: Joi.string().required().messages({
          "string.empty": "請輸入照片位置。",
          "any.required": "請輸入照片位置。",
        }),
      })
    ),
    categories: Joi.string()
      .valid(
        "隨你PAD吸管",
        "環保無痕窗貼",
        "矽膠小餐墊",
        "蜂巢坐靠墊",
        "不倒翁門擋",
        "其它"
      )
      .required()
      .messages({
        "any.required": "請輸入正確的商品分類名稱。",
        "any.only": "請輸入正確的商品分類名稱",
      }),
    colors: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        code: Joi.string(),
      })
    ),
    patterns: Joi.array().items(Joi.string()),
    notice: Joi.array().items(Joi.string()).max(5),
    imagePath: Joi.string().required().message({
      "any.required": "請填入圖片路徑。",
    }),
  });
  return schema.validate(data);
};

const updateProductValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
      "string.empty": `請輸入產品名稱。`,
      "string.min": `名稱最少3個字。`,
      "string.max": `名稱最多10個字。`,
    }),
    title: Joi.string().min(5).max(30).messages({
      "string.empty": `請輸入標題。`,
      "string.min": `標題最少5個字。`,
      "string.max": `標題最多25個字。`,
    }),
    desc: Joi.string().min(10).max(150).messages({
      "string.empty": `請輸入產品描述。`,
      "string.min": `產品描述最少10個字。`,
      "string.max": `產品描述最多100個字。`,
    }),
    price: Joi.number().min(0).messages({
      "number.empty": `請輸入產品價格。`,
      "number.min": `價格最少0元。`,
    }),
    imgs: Joi.array().items(
      Joi.object({
        _id: Joi.any(),
        desc: Joi.string(),
        src: Joi.string(),
        pic_id: Joi.number(),
      })
    ),
    categories: Joi.string()
      .valid(
        "隨你PAD吸管",
        "環保無痕窗貼",
        "矽膠小餐墊",
        "蜂巢坐靠墊",
        "不倒翁門擋",
        "其它"
      )
      .messages({
        "any.only": "請輸入正確的商品分類名稱",
      }),
    colors: Joi.array().items(
      Joi.object({
        name: Joi.string(),
        code: Joi.string(),
        _id: Joi.any(),
      })
    ),
    patterns: Joi.array().items(Joi.string()),
    notice: Joi.array().items(Joi.string()).max(5),
    imagePath: Joi.string(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  updateUserValidation,
  updatePasswordValidation,
  productValidation,
  updateProductValidation,
};
