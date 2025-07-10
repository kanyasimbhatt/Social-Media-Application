import type { TokenContextType } from "@/types/contextTypes";
import { createContext } from "react";

const contextInitialValue: TokenContextType = {
  tokens: {
    accessToken: "",
    refreshToken: "",
  },
  setTokens: () => {},
};

export const TokenContext =
  createContext<TokenContextType>(contextInitialValue);
