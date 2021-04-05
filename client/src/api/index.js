import axios from "axios";

// import { BASE_URL } from "../constants";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

api.interceptors.request.use(
  (config) => {
    const auth =
      localStorage.getItem("customer-auth") ||
      localStorage.getItem("retailer-auth") ||
      localStorage.getItem("wholesaler-auth")  

    if (auth != null) {
      config.headers["auth-token"] = JSON.parse(auth).token;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
