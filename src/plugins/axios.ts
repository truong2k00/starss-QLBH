import LocalStorageKey from "@/common/constants/LocalStorageKey";
import authservices from "@/services/auth/login";
import axios from "axios";

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use(async (config) => {
  // Retrieve token from localStorage

  // If token is found
  // Retrieve token from localStorage
  const token = localStorage.getItem("accessToken");

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {};

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  // Return modified config
  return config;
});

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    try {
      localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
      if (localStorage.getItem("refreshToken") !== null) {
        const res = await authservices.refreshToken(
          localStorage.getItem("refreshToken")
        );
        console.log(res);
      }
    } catch (err) {
      router.push("/login");
    }
    // Handle error
    if (error.response === 401) {
      // ℹ️ Logout user and redirect to login page
      // Remove "userData" from localStorage
      localStorage.removeItem("userData");

      // Remove "accessToken" from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userAbilities");

      // If 401 response returned from api
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosIns;
