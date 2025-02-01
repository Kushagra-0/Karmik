import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const Login = () => {
  const { setToken } = useAuth(); // Get the setToken function from the context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true); // Start loader

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setToken(response.data.token); // Use the context's setToken method
      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials"); // Show error inside the button
      setIsLoading(false); // Stop loader after error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-600">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 mt-6 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg ${
              isLoading ? "bg-gray-400" : "bg-orange-600 hover:bg-orange-700"
            } text-white`}
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin w-5 h-5 border-4 border-white rounded-full border-t-transparent" />
              </div>
            ) : (
              "Login"
            )}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p> // Display error below the button
          )}
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
