const router = require("express").Router();
const axios = require("axios");
// recapcha
router.post("/", async (req, res) => {
  if (
    req.body?.captcha === undefined ||
    req.body?.captcha === "" ||
    req.body?.captcha === null
  ) {
    res.status(400).json("請勾選我不是機器人");
  }

  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
  try {
    const response = await axios(verifyUrl);
    const success = response.data.success;
    res.status(200).json(success);
  } catch (err) {
    console.log(err);
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

module.exports = router;
