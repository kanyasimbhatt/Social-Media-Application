import { axiosUserInstance } from "@/Service/axiosInstance";
import { useEffect, useState } from "react";

type UseRefreshReturnType = {
  accessToken: string;
  refreshToken: string;
};

const tokenInitialValue: UseRefreshReturnType = {
  accessToken: "",
  refreshToken: "",
};

const useRefresh = (): UseRefreshReturnType => {
  const [tokens, setTokens] = useState<UseRefreshReturnType>(tokenInitialValue);
  const refresh = async () => {
    try {
      const response = await axiosUserInstance.post("/refresh-token");
      setTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    refresh();
  }, []);

  return tokens;
};

export default useRefresh;
