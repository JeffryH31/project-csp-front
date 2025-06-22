import axios from "axios";

export const CreateAxiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return instance;
};
