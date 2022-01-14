import { axiosInstance } from "./config";
const ROUTE = "mail";
class MainService {
  signup(email) {
    return axiosInstance.post(`${ROUTE}/signup`, { email });
  }
}
export default new MainService();
