import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "react-feather";
import { useAuth } from "../context/AuthContext"; // Import the custom hook

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useAuth(); // Get token and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate("/login"); // Redirect to login page after logout
  };

  const closeMenu = () => setIsOpen(false); // Helper to close the mobile menu

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
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <ul className="flex flex-col items-center space-y-4">
            {token ? (
              <>
                <li>
                  <Link to="/add-events" className="text-gray-700 hover:text-orange-600" onClick={closeMenu}>
                    Add Events
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-gray-700 hover:text-orange-600" onClick={closeMenu}>
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/my-events" className="text-gray-700 hover:text-orange-600" onClick={closeMenu}>
                    My Events
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu(); // Close the menu after logout
                    }}
                    className="text-gray-700 hover:text-orange-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-gray-700 hover:text-orange-600" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-700 hover:text-orange-600" onClick={closeMenu}>
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
