const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    username: {
      type: String,
      min: 2,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 20,
      required: true,
    },
    gender: {
      type: String,
      enum: ["男", "女", "其他", "未設定"],
      default: "未設定",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: "",
    },
    like: {
      type: [String],
      default: [],
    },
    lank: {
      type: String,
      default: "普通會員",
    },
    coupon: {
      type: [{ code: { type: String }, expiredDate: { type: Date } }],
    },
    coverColor: {
      type: String,
      default: "#eee3d4",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

//encrypt password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (err) {
      console.log(err);
      res.status(500).json("系統發生錯誤，請稍後再試。");
    }
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

// UserSchema.statics.newLogin = function login(email, cb) {
//   return this.findOneAndUpdate(
//     { email: email },
//     { lastLogin: Date.now() },
//     { new: true },
//     cb
//   );
// };

module.exports = mongoose.model("User", UserSchema);
