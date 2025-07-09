import axios from "axios";

export const axiosUserInstance = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/users",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosUserInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error(error);
  }
);

axiosUserInstance.interceptors.response.use(
  (response) => {
    if (
      "refreshToken" in response.data.data &&
      "accessToken" in response.data.data
    ) {
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      sessionStorage.setItem("accessToken", response.data.data.accessToken);
    }
    return response;
  },
  (error) => {
    console.error(error);
  }
);
