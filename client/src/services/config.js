import axios from "axios";
// export const axiosInstance = axios.create({
//   baseURL: "https://hsinyaoecommercewebsite.herokuapp.com/api/",
// });

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const reCaptcha = {
  key: "6LcqoXEeAAAAABYIaZCvWJvhiM-3Cw-kixmjE9Vg",
};
