import { axiosInstance } from "./config";
const ROUTE = "auth";

class AuthService {
  register(input) {
    return axiosInstance.post(`${ROUTE}/register`, input);
  }
}

export default new AuthService();
