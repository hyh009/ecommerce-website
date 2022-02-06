import { axiosInstance } from "./config";
const ROUTE = "users";

class UserService {
  get(id, TOKEN) {
    return axiosInstance.get(`${ROUTE}/find/${id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
  patch(updateUser, TOKEN) {
    const { accessToken, ...saveUser } = updateUser;
    return axiosInstance.patch(`${ROUTE}/${updateUser._id}`, saveUser, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  uploadImage(base64EncodedImage, userId, TOKEN) {
    const data = {
      fileString: base64EncodedImage,
      fileName: userId,
    };
    return axiosInstance.post(`${ROUTE}/uploadImage/${userId}`, data, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  get5NewUsers(TOKEN) {
    return axiosInstance.get(`${ROUTE}/?new=true`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  getAll(TOKEN) {
    return axiosInstance.get(`${ROUTE}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  getStats(year, TOKEN) {
    return axiosInstance.get(`${ROUTE}/stats?year=${year}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
}

export default new UserService();
