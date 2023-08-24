import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import "./addmovie.css";
import { userinfo } from "../Firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

const Login = () => {
  const back = localStorage.getItem("sentbysignup") == true;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errmsg, seterrmsg] = useState("");
  const [showerr, setshowerr] = useState(false);
  const log = async () => {
    const phone = form.phone;
    const firstLetter = phone.charAt(0);
    if (firstLetter === "0") {
      form.phone = form.phone.replace(/^0/, "");
    } else {
    }
    try {
      setLoading(true);
      const quer = query(userinfo, where("phone", "==", form.phone));
      const querysnapshot = await getDocs(quer);
      if (querysnapshot.empty) {
        seterrmsg("Invalid Phone number");
        setshowerr(true);
        setLoading(false);
        return;
      } else {
      }
      querysnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.password == form.password) {
          localStorage.setItem("loggedin", true);
          localStorage.setItem("name", data.name);
          Swal.fire("Success!", "Logged in Successfully!", "success");
          {
            back ? navigate(-3) : navigate(-1);
          }
          setLoading(false);
          localStorage.removeItem("sentbysignup");
        } else if (data.password !== form.password) {
          seterrmsg("Incorrect Password");
          setshowerr(true);
          setLoading(false);
        }
      });
    } catch (err) {
      Swal.fire("Oops!", "An error occured!", "error");
    }
  };
  return (
    <div
      className="maindiv"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "0",
      }}
    >
      <h1>Login</h1>
      <input
        style={{ margin: "10px 0" }}
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone number"
      />
      <input
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Password"
      />
      {showerr ? (
        <p
          style={{
            color: "red",
            margin: "5px 0 0 0",
            letterSpacing: "1px",
          }}
        >
          {errmsg}
        </p>
      ) : (
        <></>
      )}
      {loading ? (
        <button style={{ height: "40px", marginBottom: "20px" }}>
          <Oval
            height={30}
            color="black"
            secondaryColor="var(--primary-color)"
          />
        </button>
      ) : (
        <button onClick={log} style={{ height: "40px", marginBottom: "20px" }}>
          Login
        </button>
      )}
      <p>
        Don't have a account ?{" "}
        <Link style={{ color: "rgb(25, 158, 224)" }} to={"/signup"}>
          Signup
        </Link>
      </p>
      <button
        style={{
          width: "70px",
          height: "50px",
          top: "0",
          left: "5vh",
        }}
        onClick={() => {
          {
            back ? navigate(-3) : navigate(-1);
          }
          localStorage.removeItem("sentbysignup");
        }}
        className="backbutton"
      >
        <KeyboardBackspaceIcon className="arrow" />
      </button>
    </div>
  );
};

export default Login;
