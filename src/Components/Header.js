import "./header.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Header() {
  const Navigate = useNavigate();
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
  const [searchinput, setSearchinput] = useState("");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Navigate(`/search/${searchinput}`);
      e.preventDefault();
    } else {
    }
  };
  return (
    <div className="navbar">
      <h1 className="logo">
        Cine<span style={{ color: "rgba(239, 122, 10, 1)" }}>Morphia</span>
      </h1>
      <div className="rightarea">
        <div className="searchdiv">
          <input
            value={searchinput}
            onChange={(e) => {
              setSearchinput(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            type="text"
            className="searchbar"
            placeholder="Search"
          />
          <Link to={`/search/${searchinput}`}>
            <SearchIcon className="searchicon" />
          </Link>
        </div>
        {loggedIn ? (
          <button
            style={{ padding: "0 20px", width: "auto" }}
            className="navlogbtn"
            onClick={handlelogout}
          >
            Welcome, {name}
          </button>
        ) : (
          <Link style={{ textDecoration: "none" }} to={"./login"}>
            <button className="navlogbtn">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
