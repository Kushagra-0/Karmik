import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isWhiteBackground = false }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > window.innerHeight);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
    
      const navBackground = isWhiteBackground || isScrolled ? 'bg-white' : 'bg-[#FFA500]';
      const textColor = isWhiteBackground || isScrolled ? 'text-[#FFA500]' : 'text-white';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 p-4 transition-colors duration-300 ${navBackground}`}>
            <div className="container flex justify-between items-center py-1">
                <div className="flex items-center space-x-6 mx-12">
                    <Link to="/">
                    <span className={`font-bold text-xl ${textColor}`}>Karmik</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                        <>
                        <Link to="/login">
                            <span className={`flex items-center space-x-2 ${textColor} hover:bg-[#F6F6F3] hover:text-[#FFA500] hover:rounded-3xl p-3`}>
                                <span>Login</span>
                            </span>
                        </Link>

                        <Link to="/register">
                            <span className={`flex items-center space-x-2 ${textColor} hover:bg-[#F6F6F3] hover:text-[#FFA500] hover:rounded-3xl p-3`}>
                                <span>Register</span>
                            </span>
                        </Link>
                        </>     
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
