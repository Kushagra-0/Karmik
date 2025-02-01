import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "react-feather";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md py-4 z-50">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-orange-600">Karmik</h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/login" className="text-gray-700 hover:text-orange-600">Login</Link></li>
          <li><Link to="/register" className="text-gray-700 hover:text-orange-600">Register</Link></li>
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
            <li><Link to="/login" className="text-gray-700 hover:text-orange-600" onClick={() => setIsOpen(false)}>Login</Link></li>
            <li><Link to="/register" className="text-gray-700 hover:text-orange-600" onClick={() => setIsOpen(false)}>Register</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
