import React from "react";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, Navigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { app } from "../Firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { userinfo } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import Swal from "sweetalert2";
import "./addmovie.css";
import { Oval } from "react-loader-spinner";

const Signup = () => {
  const Navigate = useNavigate();
  const [loading2, setloading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [OTP, setOTP] = useState("");
  const [otpreq, setotpreq] = useState(true);
  const auth = getAuth(app);
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {},
    });
  };
  const [errmsg, seterrmsg] = useState("");
  const [showerrmsg, setShowerrmsg] = useState(false);
  const requestOTP = async () => {
    setLoading(true);
    const phone = form.phone;
    const firstLetter = phone.charAt(0);
    if (firstLetter === "0") {
      form.phone = form.phone.replace(/^0/, "");
    } else {
    }
    const quer = query(userinfo, where("phone", "==", form.phone));
    const querysnapshot = await getDocs(quer);
    if (querysnapshot.empty) {
      if (form.name == "") {
        seterrmsg("please enter a valid name");
        setShowerrmsg(true);
        setLoading(false);
      } else if (form.password == "") {
        seterrmsg("Please enter a valid Password");
        setShowerrmsg(true);
        setLoading(false);
      } else {
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+92${form.phone}`, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            let timerInterval;
            Swal.fire({
              title: "Wait!",
              html: `Sending verification code to 0${form.phone}`,
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });
            setLoading(false);
            setotpreq(false);
          })
          .catch((error) => {
            Swal.fire(
              "Error!",
              "Due to high demand, our OTP servers are currently busy. Please try again later",
              "error"
            );
            setLoading(false);
          });
      }
    } else {
      Swal.fire(
        "Error!",
        "The phone number you entered is already in use. Please try a different number.",
        "error"
      );
      setLoading(false);
    }
  };

  const uploaddata = async () => {
    await addDoc(userinfo, form);
    Swal.fire("Success!", "Account created Successfully!", "success");
    setloading2(false);
    localStorage.setItem("sentbysignup", true);
    Navigate(-1);
  };
  const verifyotp = async () => {
    setloading2(true);
    try {
      window.confirmationResult
        .confirm(OTP)
        .then((result) => {
          uploaddata();
        })
        .catch((error) => {
          Swal.fire(
            "Error!",
            `Please enter the correct 6 digit code sent to 0${form.phone}`,
            "error"
          );
          setloading2(false);
        });
    } catch (err) {
      Swal.fire("Error!", "An unexpected error occured", "error");
      setloading2(false);
    }
  };
  return (
    <>
      <div
        className="maindiv"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          alignItems: "center",
          justifyContent: "center",
          margin: "0",
        }}
      >
        {otpreq ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Signup</h1>
            <input
              style={{ margin: "15px 0" }}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength="11"
              placeholder="Name"
            />
            <input
              style={{ margin: "15px 0" }}
              type="number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={11}
              placeholder="Phone number"
            />
            <input
              style={{ margin: "15px 0" }}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Set Password"
            />
            <p
              style={{
                textAlign: "center",
                lineHeight: "20px",
                margin: "5px 0 0 0",
              }}
            >
              Please enter your real phone number because <br /> the login code
              will be sent to this number
            </p>
            <p>
              already have a account ?{" "}
              <Link style={{ color: "rgb(25, 158, 224)" }} to={"/login"}>
                login
              </Link>
            </p>
            {showerrmsg ? (
              <p style={{ margin: "0", color: "red" }}>{errmsg}</p>
            ) : (
              <></>
            )}

            {loading ? (
              <button style={{ height: "40px", marginBottom: "20px" }}>
                <Oval height={30} color="black" secondaryColor="orange" />
              </button>
            ) : (
              <button
                style={{ width: "110px", height: "40px" }}
                onClick={requestOTP}
                type="submit"
              >
                Get otp
              </button>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>OTP</h1>
            <input
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              style={{ margin: "10px 0" }}
              placeholder="Code"
            />
            {loading2 ? (
              <button style={{ height: "40px", marginBottom: "20px" }}>
                <Oval
                  height={30}
                  color="black"
                  secondaryColor="var(--primary-color)"
                />
              </button>
            ) : (
              <button style={{ height: "40px" }} onClick={verifyotp}>
                Signup
              </button>
            )}
          </div>
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
          Navigate(-1);
          localStorage.setItem("sentbysignup", true);
        }}
      >
        <KeyboardBackspaceIcon className="arrow" />
      </button>
      <div id="sign-in-button"></div>
    </>
  );
};

export default Signup;
