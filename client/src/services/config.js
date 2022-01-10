import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://hsinyaoecommercewebsite.herokuapp.com/api/",
});
