import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

const LikedPost = ({ ID, each_cardObj, USER }) => {
  return (
    <div>
      <div
        className="card "
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.496)",
          width: "100%",
        }}>
        <img
          src={each_cardObj.Cover_Image}
          className="card-img-top"
          alt="..."
          style={{ height: "16rem" }}
        />

        <div className="card_overlay">
          <div className="overlay_text" style={{ color: "white" }}>
            <div
              className="d-flex justify-content-around"
              style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
              <div> {each_cardObj.Title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedPost;
