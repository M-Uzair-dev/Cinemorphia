import { useEffect } from "react";
import Card from "./Cards";
import "./card.css";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesref } from "../Firebase";

const Cardiv = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    async function getdata() {
      setLoading(true);
      const querySnapshot = await getDocs(moviesref);
      const dataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredData =
        activeTab === "all"
          ? dataArray
          : dataArray.filter((movie) => movie.genre === activeTab);

      const shuffledData = shuffleArray(filteredData);
      setData(shuffledData);
      setLoading(false);
    }
    getdata();
  }, [activeTab]);

  function shuffleArray(array) {
    let currentIndex = array.length,
      randomIndex,
      temporaryValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  return (
    <>
      <div className="cardsec">
        <div className="categoriesdiv">
          <div className="divofcat">
            <h3
              onClick={() => {
                handleClick("all");
              }}
              style={{
                color: activeTab === "all" ? "var(--primary-color)" : "inherit",
              }}
            >
              All
            </h3>
            <h3
              onClick={() => {
                handleClick("Action");
              }}
              style={{
                color:
                  activeTab === "Action" ? "var(--primary-color)" : "inherit",
              }}
            >
              ACTION
            </h3>
            <h3
              onClick={() => {
                handleClick("Horror");
              }}
              style={{
                color:
                  activeTab === "Horror" ? "var(--primary-color)" : "inherit",
              }}
            >
              HORROR
            </h3>
            <h3
              onClick={() => {
                handleClick("Sci-fi");
              }}
              style={{
                color:
                  activeTab === "Sci-fi" ? "var(--primary-color)" : "inherit",
              }}
            >
              SCI-FI
            </h3>
            <h3
              onClick={() => {
                handleClick("Comedy");
              }}
              style={{
                color:
                  activeTab === "Comedy" ? "var(--primary-color)" : "inherit",
              }}
            >
              COMEDY
            </h3>
            <h3
              onClick={() => {
                handleClick("Animation");
              }}
              style={{
                color:
                  activeTab === "Animation"
                    ? "var(--primary-color)"
                    : "inherit",
              }}
            >
              ANIMATION
            </h3>
          </div>
        </div>
        {activeTab === "all" ? (
          <h1 className="trendingmoviesheading">
            <span style={{ color: "var(--primary-color)" }}>Trending</span>{" "}
            movies for you
          </h1>
        ) : (
          <h1 className="trendingmoviesheading">
            <span style={{ color: "var(--primary-color)" }}>{activeTab}</span>{" "}
            movies for you
          </h1>
        )}

        <div className="cardsection">
          {loading ? (
            <div
              style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TailSpin
                className="spinner"
                height="50"
                width="50"
                color="var(--primary-color)"
              />
            </div>
          ) : (
            data.map((element, index) => {
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
      </div>
    </>
  );
};

export default Cardiv;
