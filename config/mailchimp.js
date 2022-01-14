require("dotenv").config();
const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_KEY,
  server: "us20",
});

module.exports = { mailchimp };
