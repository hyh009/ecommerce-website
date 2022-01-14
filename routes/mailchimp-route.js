const router = require("express").Router();
const { mailchimp } = require("../config/mailchimp");
const { verifyTokenAndAdmin } = require("./validation-token");
const LIST_ID = "bf0c527b7f";
// email signup
router.post("/signup", async (req, res) => {
  const { email } = req.body;
  try {
    await mailchimp.lists.addListMember(LIST_ID, {
      email_address: email,
      status: "subscribed",
    });
    res.status(200).json("成功訂閱電子報");
  } catch (err) {
    if (JSON.parse(err.response.error.text).title === "Member Exists") {
      res.status(400).json("此郵件已訂閱電子報。");
    } else if (
      JSON.parse(err.response.error.text).title === "Invalid Resource"
    ) {
      res.status(400).json("此email不能訂閱電子報");
    } else {
      res.status(500).json("系統發生問題，請稍候再試");
    }
  }
});

// not finish (for admin dashboard)
// get list growth history (month by month)
router.get("/history", verifyTokenAndAdmin, async (req, res) => {
  try {
    const response = await mailchimp.lists.getListGrowthHistory(LIST_ID);
    res.status(200).json(response.history);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

// get list information
router.get("/members", verifyTokenAndAdmin, async (req, res) => {
  try {
    const response = await mailchimp.lists.getList(LIST_ID);
    res.status(200).json(response.stats);
  } catch (err) {
    res.status(500).json("系統發生問題，請稍候再試");
  }
});

module.exports = router;
