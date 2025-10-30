import { toast } from "react-toastify";

import api from "../utils/api";

// types
import type { UserLogin, UserRegister } from "../types/User";
import type { AxiosError } from "axios";

export const useApi = () => {
  const register = async (user: UserRegister) => {
    try {
      const response = await api.post("/auth/register", user);

      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      toast.error(msgText);
    }
  };

  const login = async (user: UserLogin) => {
    try {
      const response = await api.post("/auth/login", user);

      toast.success(response.data.message);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      const msgText =
        err.response?.data?.message || "An unexpected error occurred!";

      toast.error(msgText);
    }
  };

  return {
    register,
    login,
  };
};

export default useApi;
