import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Users, Truck, Heart, ArrowRightCircle } from "react-feather";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full min-h-screen bg-orange-200 flex items-end justify-start">
        <h1 className="text-orange-600 text-6xl md:text-8xl lg:text-9xl font-bold p-6 md:p-10">
          Karmik
        </h1>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-16 px-4 md:px-6 bg-gray-50 md:h-screen">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mt-12 md:mt-24 lg:mt-52">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mt-8 md:mt-12">
          {[
            { Icon: Truck, title: "Food Donors", text: "Restaurants and individuals can list surplus food for donation." },
            { Icon: Users, title: "NGOs & Receivers", text: "NGOs can browse food listings and collect them for redistribution." },
            { Icon: Heart, title: "Community Impact", text: "Reduce food waste and help feed those in need with every donation." },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md text-center max-w-xs w-full transition-transform duration-300 hover:scale-105"
            >
              <feature.Icon size={40} className="text-orange-600 mx-auto" />
              <h3 className="text-lg md:text-xl font-semibold mt-3 md:mt-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mt-2">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-12 md:py-16 bg-orange-200 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
          Join the Movement
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-black px-4">
          Start donating food or help collect surplus food for your community today.
        </p>
        <div className="mt-6 md:mt-8 flex justify-center">
          <Link to="/register">
            <button className="bg-white text-orange-600 font-semibold px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center gap-2 transition-transform duration-300 hover:scale-105 text-sm md:text-base">
              Get Started <ArrowRightCircle size={18} className="hidden md:block" />
              <ArrowRightCircle size={16} className="md:hidden" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;