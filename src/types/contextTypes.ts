export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type TokenContextType = {
  tokens: TokenType;
  setTokens: React.Dispatch<React.SetStateAction<TokenType>>;
};
