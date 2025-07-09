import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePreviousLocation = () => {
  const location = useLocation();
  const prevLocation = useRef("");

  useEffect(() => {
    prevLocation.current = location.pathname;
  }, [location]);

  return prevLocation.current;
};

export default usePreviousLocation;
