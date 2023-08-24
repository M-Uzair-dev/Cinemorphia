import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import "./search.css";
import { moviesref } from "../Firebase";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getDocs } from "firebase/firestore";
import Card from "./Cards";
import { TailSpin } from "react-loader-spinner";

const Search = () => {
  const Navigate = useNavigate();
  const { id: moviename } = useParams();
  const [searchstate, setSearchstate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const lowerCaseMovieName = moviename ? moviename.toLowerCase() : ""; // Add null check

      try {
        const res = await getDocs(moviesref);
        const allData = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if (lowerCaseMovieName.trim() === "") {
          setFilteredData(allData);
        } else {
          const filteredDocs = allData.filter((doc) => {
            const lowerCaseDocName = doc.name ? doc.name.toLowerCase() : ""; // Add null check
            return lowerCaseDocName.includes(lowerCaseMovieName);
          });

          setFilteredData(filteredDocs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [moviename]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Navigate(`/search/${searchstate}`);
      e.preventDefault();
    } else {
    }
  };

  return (
    <div className="searchpage">
      {moviename === undefined ? (
        <h1>
          All movies for for <span>You</span>
        </h1>
      ) : (
        <h1>
          Search for <span>{moviename}</span>
        </h1>
      )}

      <div className="searchdiv">
        <input
          value={searchstate}
          onChange={(e) => {
            setSearchstate(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          type="text"
          className="searchbar"
          placeholder="Search"
        />
        <Link to={`/search/${searchstate}`}>
          <SearchIcon className="searchicon" />
        </Link>
      </div>
      <div className="cardsection">
        {loading ? (
          <TailSpin
            className="spinner"
            height="50"
            width="50"
            color="var(--primary-color)"
          />
        ) : filteredData.length === 0 ? (
          <h4>
            No movies available for <span>{moviename}</span>, <br /> Please
            <span> check your spelling</span>, and if your spelling is correct.{" "}
            <br /> The movie is most likely <span>not available</span>
          </h4>
        ) : (
          filteredData.map((element, index) => {
            return (
              <div key={index} className="link">
                <Card
                  key={index}
                  Link={element.id}
                  name={element.name}
                  year={element.year}
                  imageurl={element.imagelink}
                  rating={element.rating / element.userrated}
                />
              </div>
            );
          })
        )}
      </div>
      <button
        className="backbutton"
        style={{
          width: "70px",
          height: "50px",
          top: "5vh",
          left: "5vh",
          background: "var(--primary-color)",
          color: "black",
          border: "none",
        }}
        onClick={() => {
          Navigate("/");
          localStorage.setItem("sentbysignup", true);
        }}
      >
        <KeyboardBackspaceIcon className="arrow" />
      </button>
    </div>
  );
};

export default Search;
