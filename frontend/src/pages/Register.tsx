import { useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-600">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600" required />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600" 
              required 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-3 mt-6 flex items-center" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">Register</button>
        </form>
        <p className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-orange-600 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
