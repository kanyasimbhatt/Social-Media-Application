import { TokenContext } from "@/context/TokenContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("Context should be used within the provider only");
  }
  return context;
};
