import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  post(user) {
    return axios.post(`${API_URL}/login`, user);
  }
}

export default new AuthService();
