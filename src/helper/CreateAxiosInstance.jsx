import axios from "axios";

export const CreateAxiosInstance = () => {
  const instance = axios.create({
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return instance;
};
