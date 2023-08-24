import React from "react";
import "./card.css";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";

const Cards = (props) => {
  return (
    <div className="card">
      <img className="cardimage" alt="card pic" src={props.imageurl} />

      <Link to={`/moviedetails/${props.Link}`}>
        <div className="cardtext">
          <h3>
            {props.name} <br />
            <span>({props.year})</span>
          </h3>
          <ReactStars
            className="cardstars"
            size={20}
            count={5}
            edit={false}
            value={props.rating}
          />
        </div>
      </Link>
    </div>
  );
};

export default Cards;
