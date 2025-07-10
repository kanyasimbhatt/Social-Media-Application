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
    return response;
  },
  (error) => {
    console.error(error);
  }
);
