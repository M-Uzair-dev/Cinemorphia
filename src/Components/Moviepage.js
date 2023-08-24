import React, { useState } from "react";
import "./moviepage.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect } from "react";
import { getDoc, getDocs, query, where } from "firebase/firestore";
import { moviesref } from "../Firebase";
import { TailSpin } from "react-loader-spinner";
import { doc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { reviewssref } from "../Firebase";
import { db } from "../Firebase";
import { updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

const Moviepage = () => {
  const [reviewadded, setReviewadded] = useState(0);
  const [reviewadding, setReviewadding] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  let [userrating, setUserrating] = useState(0);
  const loggedIn = localStorage.getItem("loggedin") === "true";
  const name = localStorage.getItem("name");
  const [data, setData] = useState({
    name: "",
    year: "",
    imagelink: "",
    description: "",
    downloadlink: "",
    rating: 0,
    userrated: 0,
  });
  const [com, setCom] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsloading, setReviewsloading] = useState(true);
  const [errmsg, seterrmsg] = useState("");
  const [showerrmsg, setShowerrmsg] = useState(false);
  const addreview = async () => {
    setReviewadding(true);
    if (com == "") {
      seterrmsg("Please enter your thought");
      setReviewadding(false);
      setShowerrmsg(true);
    } else if (userrating == 0) {
      seterrmsg("Please enter your rating");
      setReviewadding(false);
      setShowerrmsg(true);
    } else {
      await addDoc(reviewssref, {
        movieid: id,
        name: name,
        rating: userrating,
        thought: com,
        time: new Date().getTime(),
      });
      const adta = doc(db, "Movies", id);
      await updateDoc(adta, {
        rating: data.rating + userrating,
        userrated: data.userrated + 1,
      });
      setReviewadding(false);
      Swal.fire(
        "Success!",
        "Your review has been successflly added",
        "success"
      );
      setCom("");
      setUserrating(0);
      setReviewadded(reviewadded + 1);
    }
  };
  useEffect(() => {
    const tempreview = localStorage.getItem("savedreview");
    {
      tempreview == null ? setCom("") : setCom(tempreview);
    }
    const temprating = localStorage.getItem("savedrating");
    const numtemp = Number(temprating);
    setUserrating(numtemp);
    const getdata = async () => {
      window.scrollTo(0, 0);
      const movieRef = doc(moviesref, id);
      const res = await getDoc(movieRef);
      setData(res.data());
      setLoading(false);
      localStorage.removeItem("savedreview");
      localStorage.removeItem("savedrating");
    };
    getdata();
  }, []);
  useEffect(() => {
    setReviewsloading(true);
    setReviews([]);
    async function getdata() {
      let quer = query(reviewssref, where("movieid", "==", id));
      const querysnapshot = await getDocs(quer);
      querysnapshot.forEach((doc) => {
        setReviews((prev) => [...prev, doc.data()]);
      });
      setReviewsloading(false);
    }
    getdata();
  }, [reviewadded]);
  const handlenotloginpost = () => {
    localStorage.setItem("savedreview", com);
    localStorage.setItem("savedrating", userrating);
    navigate("/login");
  };
  return (
    <>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TailSpin color="var(--primary-color)" />
        </div>
      ) : (
        <div>
          <div className="maindiv">
            <div>
              <img className="mainimage" alt="Movie pic" src={data.imagelink} />
            </div>
            <div className="content">
              <h1>
                {data.name} <span>({data.year})</span>
              </h1>
              <ReactStars
                className="mainstars"
                size={20}
                count={5}
                edit={false}
                value={data.rating / data.userrated}
              />
              <p>{data.description}</p>
              <div className="endiv">
                <button
                  className="downloadbutton"
                  onClick={() => {
                    window.location.replace(data.downloadlink);
                  }}
                >
                  Download
                </button>
                <input
                  className="comentinput"
                  value={com}
                  onChange={(e) => {
                    setCom(e.target.value);
                  }}
                  style={{ margin: "20px 0 0 0" }}
                  placeholder="Share your thoughts..."
                />
                <ReactStars
                  className="comentstars"
                  style={{ margin: "0" }}
                  count={5}
                  size={14}
                  edit={true}
                  half={false}
                  value={userrating}
                  onChange={(newRating) => {
                    setUserrating(newRating);
                  }}
                />
                {showerrmsg ? (
                  <p style={{ margin: "15px 0", color: "red" }}>{errmsg}</p>
                ) : (
                  <></>
                )}
                {loggedIn ? (
                  reviewadding ? (
                    <button style={{ height: "40px", marginBottom: "20px" }}>
                      <Oval
                        height={30}
                        color="black"
                        secondaryColor="var(--primary-color)"
                      />
                    </button>
                  ) : (
                    <button
                      style={{ margin: "0 0 20px 0 " }}
                      onClick={addreview}
                      className="postbutton"
                    >
                      Post
                    </button>
                  )
                ) : reviewadding ? (
                  <button style={{ height: "40px", marginBottom: "20px" }}>
                    <Oval
                      height={30}
                      color="black"
                      secondaryColor="var(--primary-color)"
                    />
                  </button>
                ) : (
                  <button
                    style={{ margin: "0 0 20px 0 " }}
                    className="postbutton"
                    onClick={() => {
                      handlenotloginpost();
                    }}
                  >
                    Post
                  </button>
                )}
                {reviewsloading ? (
                  <TailSpin color="var(--primary-color)" height={35} />
                ) : (
                  reviews.map((element, index) => {
                    return (
                      <div key={index} className="comment">
                        <h3
                          style={{ margin: "0 0 10px 0" }}
                          className="commentname"
                        >
                          {element.name}
                        </h3>
                        <p className="commentdate">
                          {new Date(element.time).toLocaleString()}
                        </p>
                        <ReactStars
                          className="comentedstars"
                          size={15}
                          count={5}
                          style={{ marginLeft: "0" }}
                          edit={false}
                          value={element.rating}
                        />
                        <p className="commenttext">{element.thought}</p>
                      </div>
                    );
                  })
                )}
              </div>
              <button
                style={{
                  width: "70px",
                  height: "50px",
                  top: "0",
                  left: "5vh",
                }}
                onClick={() => {
                  navigate(-1);
                }}
                className="backbutton"
              >
                <KeyboardBackspaceIcon className="arrow" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Moviepage;
