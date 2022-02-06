const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes").userRoute;
const authRoute = require("./routes").authRoute;
const productRoute = require("./routes").productRoute;
const cartRoute = require("./routes").cartRoute;
const orderRoute = require("./routes").orderRoute;
const mailchimpRoute = require("./routes").mailchimpRoute;
const paymentRoute = require("./routes").paymentRoute;
// const stripeRoute = require("./routes").stripeRoute;
const cors = require("cors");
const path = require("path");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/mail", mailchimpRoute);
app.use("/api/payment", paymentRoute);
// app.use("/api/stripe", stripeRoute);

// app.use(express.static(path.join(__dirname, "/client/public")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/public", "index.html"));
// });

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.get("/*", (req, res) => {
  res.status(404).json("404此頁面不存在。");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Running on ${process.env.PORT + " port" || "5000 port"}`);
});
