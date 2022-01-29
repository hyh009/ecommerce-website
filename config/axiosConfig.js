const axios = require("axios");
const axiosInstance = axios.create({
  proxy: {
    protocol: "http",
    host: process.env.FIXIE_URL,
    port: 80,
    auth: {
      username: "fixie",
      password: process.env.FIXIE_TOKEN,
    },
  },
});

module.exports = axiosInstance;
