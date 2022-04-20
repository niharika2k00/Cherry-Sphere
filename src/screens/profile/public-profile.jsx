import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/profile.css";
import "../../styles/homescreen.css";
import "../../App.css";
import firebase from "firebase";
import { useLocation } from "react-router-dom";
import LOAD from "../../components/loading.js";
import OTHER_POST from "../home/liked-post";
import "../../styles/otherProfileStyle.css";

const Othersprofile = ({
  USER,
  set_USER,
  allPost,
  setallPost,
  fetch_ALL_Users_Posts,
  loading,
  setLoading,
}) => {
  const db = firebase.firestore();
  const location = useLocation();
  const modify_url = location.pathname;
  const url_postId = modify_url.substring(modify_url.lastIndexOf("/") + 1);

  console.log(url_postId);

  const [other, setOther] = useState([]);
  const [about, setAbout] = useState([]);
  const [otherPost, setOtherPost] = useState([]);

  // FETCHING DETAILS OF THE CORRESPONDING POST'S USER------- for profile
  const otherUserDetails = async () => {
    if (Object.keys(USER).length !== 0) {
      /*  db.collection('users').doc(url_postId).get()
                 .then(snapshot => {
                     setOther(snapshot.data());
                     console.log(snapshot.data())
                 }) */

      const a = await db.collection("users").doc(url_postId).get();
      const getResponse = a.data();
      setOther(getResponse);
      console.log(getResponse);
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  const otherUserAbout = () => {
    if (Object.keys(USER).length !== 0) {
      db.collection("users")
        .doc(url_postId)
        .collection("about")
        .onSnapshot((snapshot) => {
          const ABOUT = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(ABOUT[0]);
          setAbout(ABOUT[0]);
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  const otherUserPost = () => {
    if (Object.keys(USER).length !== 0) {
      db.collection("users")
        .doc(url_postId)
        .collection("posts")
        .onSnapshot((snapshot) => {
          const POST = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(POST);
          setOtherPost(POST);
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  useEffect(() => {
    otherUserDetails();
    otherUserAbout();
    otherUserPost();
    console.log(other);
  }, []);

  return (
    <div>
      <div>
        <Container>
          <Row className="rowTopgap">
            <Col md={6} className="profilecontainer">
              {other && Object.keys(other).length !== 0 && other.Picture ? (
                <img
                  src={other.Picture}
                  className="rounded-circle proimg"
                  alt=" "
                  width="180rem"
                  height="180rem"
                />
              ) : (
                <img
                  src={other.Profile_Image}
                  className="rounded-circle proimg"
                  alt=" "
                  width="180rem"
                  height="180rem"
                />
              )}
            </Col>

            <Col md={6}>
              <div className="user_data">
                <h2>{other.Name} </h2>
                <p>{other.Email}</p>
                {about && about.length != 0 ? (
                  <div>
                    <p> City : {about.City} </p>
                    <p> State : {about.State} </p>
                    <p> Country : {about.Country} </p>
                  </div>
                ) : (
                  []
                )}
              </div>
            </Col>
          </Row>

          <p id="otherpost"> {other.Name}'s Posts </p>
          <hr></hr>
          <Row style={{ padding: "4rem auto" }}>
            {loading ? (
              <LOAD />
            ) : otherPost && otherPost.length !== 0 ? (
              otherPost.map((card) => (
                <Col
                  key={card.id}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  className="hovercard"
                  style={{ padding: "2rem .6rem", margin: "0rem" }}>
                  <OTHER_POST
                    ID={card.id}
                    each_cardObj={card} // Each Object
                    USER={USER}
                  />
                </Col>
              ))
            ) : null}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Othersprofile;
