import axios from "axios";

export const bookBaseaseUrl = axios.create({
  baseURL: "http://localhost:8000/book",
});

export const userBaseURL = axios.create({
  baseURL: "http://localhost:8000/user",
});

// pass token in header
bookBaseaseUrl.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authUser");
    const token = JSON.parse(authToken)?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("auth-req-error", error);
  }
);

//
bookBaseaseUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authUser");
      window.location.href("/login");
    }
  }
);
