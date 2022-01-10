import { axiosInstance } from "./config";
const ROUTE = "users";

class UserService {
  put(updateUser, TOKEN) {
    const { accessToken, ...saveUser } = updateUser;
    return axiosInstance.put(`${ROUTE}/${updateUser._id}`, saveUser, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
}

export default new UserService();
