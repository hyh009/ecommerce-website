import { axiosInstance } from "./config";
const ROUTE = "products";

class ProductService {
  //Read
  getAll(category) {
    return typeof category === "undefined" || category === "all"
      ? axiosInstance.get(ROUTE)
      : axiosInstance.get(`${ROUTE}?category=${category}`);
  }

  get(productId) {
    return axiosInstance.get(`${ROUTE}/find/${productId}`);
  }
  delete(id, TOKEN) {
    return axiosInstance.delete(`${ROUTE}/${id}`, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  update(id, updateData, TOKEN) {
    return axiosInstance.put(`${ROUTE}/${id}`, updateData, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  patch(id, updateData, TOKEN) {
    return axiosInstance.patch(`${ROUTE}/${id}`, updateData, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  create(product, TOKEN) {
    return axiosInstance.post(`${ROUTE}`, product, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }

  uploadImage(base64EncodedImage, imagePath, fileName, TOKEN) {
    const data = {
      fileString: base64EncodedImage,
      filePath: imagePath,
      fileName: fileName,
    };
    return axiosInstance.post(`${ROUTE}/uploadImage`, data, {
      headers: { token: `Bearer ${TOKEN}` },
    });
  }
}
export default new ProductService();
