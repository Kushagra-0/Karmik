import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { token } = useAuth(); // Get the token from the context

  if (!token) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
