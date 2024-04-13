import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">1 Lakh Crores worth of food is wasted every single year</h1>
          <p>
            We at karmik connects verified
            hotels, restutaunts and marriage
            halls to active NGO's to distribute food, 
            streamlining the connection for an efficient  excess food redistribution process.
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="imgContainer">
        <img src="/Frontpage 3.jpeg" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
