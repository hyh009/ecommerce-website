import { axiosInstance } from "./config";
const ROUTE = "users";

class UserService {
  patch(updateUser, TOKEN) {
    const { accessToken, ...saveUser } = updateUser;
    return axiosInstance.patch(`${ROUTE}/${updateUser._id}`, saveUser, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  uploadImage(base64EncodedImage, fileName, TOKEN) {
    const data = {
      fileString: base64EncodedImage,
      fileName: fileName,
    };
    return axiosInstance.post(`${ROUTE}/uploadImage`, data, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
}

export default new UserService();
