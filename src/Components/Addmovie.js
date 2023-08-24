import React from "react";
import "./addmovie.css";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { moviesref } from "../Firebase";
import Swal from "sweetalert2";
import { Oval } from "react-loader-spinner";

const Addmovie = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    year: "",
    description: "",
    imagelink: "",
    downloadlink: "",
    genre: "",
    rating: 0,
    userrated: 0,
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await addDoc(moviesref, form);
    setForm({
      name: "",
      year: "",
      description: "",
      imagelink: "",
      downloadlink: "",
      genre: "",
      rating: 0,
      userrated: 0,
    });
    setLoading(false);
    Swal.fire("Success!", `Movie added`, "success");
  };

  return (
    <div
      className="maindiv"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ margin: "10px 0" }}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Year"
      />
      <input
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Description"
      />
      <input
        value={form.imagelink}
        onChange={(e) => setForm({ ...form, imagelink: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Image Link"
      />
      <input
        value={form.downloadlink}
        onChange={(e) => setForm({ ...form, downloadlink: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Download Link"
      />
      <input
        value={form.genre}
        onChange={(e) => setForm({ ...form, genre: e.target.value })}
        style={{ margin: "10px 0" }}
        placeholder="Genre"
      />
      {loading ? (
        <button style={{ height: "40px", marginBottom: "20px" }}>
          <Oval
            height={30}
            color="black"
            secondaryColor="var(--primary-color)"
          />
        </button>
      ) : (
        <button onClick={handleSubmit} type="submit">
          Add
        </button>
      )}
    </div>
  );
};

export default Addmovie;
