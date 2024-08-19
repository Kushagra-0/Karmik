import { Link } from "react-router-dom"
import Navbar from "../components/navbar"
import Card from "../components/card"

const Home = () => {
  return (
    <div>
        <Navbar />

        <section className="relative bg-[#FFA500] flex items-center justify-between min-h-[860px] px-8">
        <div className="relative z-10 mt-72 ml-24">
          <Link to="./login">
            <button className="bg-white text-[#FFA500] font-bold px-6 py-3 h-16 w-56 rounded-full hover:bg-[#FFA500] hover:border-4 hover:text-white transition-colors duration-300">
              Start this journey
            </button>
          </Link>
          <div className="mx-7 text-sm mt-3 text-white">
            Try Now | Hassle free food
          </div>
        </div>

        <div className="absolute z-10 text-center mx-80 mb-96">
          <p className="text-9xl font-bold text-white drop-shadow-[6px_6px_1.2px_rgba(0,0,0,0.8)]">More food?</p>
          <p className="text-7xl font-bold text-white drop-shadow-[6px_6px_1.2px_rgba(0,0,0,0.8)]">Share it with others</p>
        </div>

        <div className="relative z-10 text-right text-white mt-72 mr-24">
          <p className="text-sm">50kg food per person wasted</p>
          <p className="text-sm">50,000 INR crores worth of food wasted annually</p>
          <p className="text-sm">One-third of all food in India is wasted or spoils before consumption</p>
          <p className="text-lg">Let's change this together!</p>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-20">
          <img
            src="Waste mngmnt.png" 
            alt="Background Image"
            className="w-[450px] h-auto" 
          />
        </div>
        </section>

        <section className="min-h-screen pt-32 pb-32 bg-white flex">
        <div className="flex-1 flex items-center justify-center">
          <Card />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center">
          <div className="text-8xl font-semibold text-[#292B29]">Lend out</div>
          <div className="text-8xl font-semibold text-[#292B29]">a helping</div>
          <div className="text-8xl font-semibold text-[#292B29]">hand.</div>
          <div className="text-black mt-4">  
            <a className="font-bold">Simple steps </a>
            Prevent Wastage
          </div>
        </div>
        </section>
    </div>
  )
}

export default Home