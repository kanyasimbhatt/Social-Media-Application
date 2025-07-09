import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import usePreviousLocation from "./hooks/usePreviousLocation";

function App() {
  const location = usePreviousLocation();
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword location={location} />}
      />
    </Routes>
  );
}

export default App;
