const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models").userModel;
const { registerValidation } = require("../validation");
const { loginValidation } = require("../validation");

//Sign up
router.post("/register", async (req, res) => {
  //check the validation of data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  // chack if email aleready exist
  const { name, username, email, password, gender } = req.body;
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).json("此Email已註冊帳號。");

  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: password,
    gender: gender,
  });

  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  //check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(401).json(error.details[0].message);

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("帳號或密碼不正確，請重新登入。");
    } else {
      user.comparePassword(password, function (err, isMatch) {
        if (isMatch) {
          //get the user
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
          );
          // call User schema static function to update lastLogin
          User.newLogin(email, function (err, data) {
            if (err) {
              console.log(err);
              res.status(500).json("系統發生錯誤，請稍後再試。");
            } else {
              const { password, ...newOthers } = data._doc;
              console.log("成功更新上次登入時間");
              res.status(200).json({ ...newOthers, accessToken });
            }
          });
        } else {
          console.log(err);
          res.status(401).json("帳號或密碼不正確，請重新登入。");
        }
      });
    }
  } catch (err) {
    return res.status(500).json("系統發生錯誤，請稍後再試。");
  }
});

module.exports = router;
