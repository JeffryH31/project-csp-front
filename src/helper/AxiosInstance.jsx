import axios from "axios";

export const AxiosInstance = () => {
  const token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return instance;
};
