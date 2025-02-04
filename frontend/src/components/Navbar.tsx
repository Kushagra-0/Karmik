import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MessageSquare, X } from "react-feather";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth(); // Get token and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login page after logout
    setIsOpen(false); // Close menu on logout
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-600">
          <Link to="/">Karmik</Link>
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          {token ? (
            <>
              <li>
                <Link to="/chat" className="text-gray-700 hover:text-orange-600">
                  <MessageSquare className="w-5" />
                </Link>
              </li>
              <li>
                <Link to="/add-events" className="text-gray-700 hover:text-orange-600">
                  Add Events
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-700 hover:text-orange-600">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/my-events" className="text-gray-700 hover:text-orange-600">
                  My Events
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-gray-700 hover:text-orange-600">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-orange-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-orange-600">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="w-auto text-orange-600" />
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col z-50">
          {/* Close Button */}
          <button className="absolute top-5 right-5 text-orange-600" onClick={() => setIsOpen(false)}>
            <X className="w-8 h-8" />
          </button>

          <ul className="flex flex-col gap-8 text-end mt-28 mr-6">
            {token ? (
              <>
                <li>
                  <Link to="/add-events" className="text-gray-700 hover:text-orange-600 text-3xl" onClick={() => setIsOpen(false)}>
                    Add Events
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-700 hover:text-orange-600 text-3xl" onClick={() => setIsOpen(false)}>
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/my-events" className="text-gray-700 hover:text-orange-600 text-3xl" onClick={() => setIsOpen(false)}>
                    My Events
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-700 hover:text-orange-600 text-3xl">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-gray-700 hover:text-orange-600 text-lg" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-700 hover:text-orange-600 text-lg" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
