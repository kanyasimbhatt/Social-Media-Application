import { useState } from "react";
import type { AuthContextProviderProps } from "@/types/contextTypes";
import { TokenContext } from "./TokenContext";
import useRefresh from "@/hooks/useRefresh";

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const { accessToken, refreshToken } = useRefresh();
  const [tokens, setTokens] = useState({
    accessToken,
    refreshToken,
  });
  return (
    <TokenContext.Provider value={{ tokens, setTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export default AuthContextProvider;
