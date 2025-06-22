import axios from "axios";

export const AxiosInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true,
  });

  return instance;
};
