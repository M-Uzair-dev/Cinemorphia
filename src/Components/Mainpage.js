import React from "react";
import "./mainpage.css";
import mainpic from "./mainpic.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Mainpage = () => {
  const loggedIn = localStorage.getItem("loggedin") === "true";
  const name = localStorage.getItem("name");
  const handlelogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to log out, ${name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("name");
        window.location.reload();
      }
    });
  };
  return (
    <div className="mainpage">
      <div className="leftside">
        <h1 className="h1">
          <span>Cinemorphia</span>, Movie Reviewing and Free Downloading
          Platform
        </h1>
        <p className="para">
          CineMorphia is a movie reviewing and free downloading platform that
          offers a variety of features. Users can read reviews of new and
          classic movies, download movies, and interact with other movie lovers
          in a community forum. CineMorphia is the perfect place to find new
          movies to watch, download your favorite movies, and connect with other
          movie lovers.
        </p>
        {loggedIn ? (
          <button
            style={{ padding: "0 20px", width: "auto" }}
            className="logbtn"
            onClick={handlelogout}
          >
            Welcome, {name}
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to={"./login"}>
            <button className="logbtn">Login</button>
          </Link>
        )}
      </div>
      <div className="image">
        <img src={mainpic} alt="mainimage" className="pic" />
      </div>
    </div>
  );
};

export default Mainpage;
