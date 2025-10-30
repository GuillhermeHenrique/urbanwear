import { createContext, type PropsWithChildren } from "react";

import { useApi } from "../hooks/useApi";

import type { UserLogin, UserRegister } from "../types/User";

type ApiContextType = {
  register: (user: UserRegister) => Promise<void>;
  login: (user: UserLogin) => Promise<void>;
};

export const ApiContext = createContext<ApiContextType>({
  register: async () => {},
  login: async () => {},
});

export const ApiProvider = ({ children }: PropsWithChildren) => {
  const { register, login } = useApi();

  return (
    <ApiContext.Provider value={{ register, login }}>
      {children}
    </ApiContext.Provider>
  );
};
