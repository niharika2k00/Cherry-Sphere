import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/profile.css";
import "../../styles/homescreen.css";
import "../../App.css";
import { useHistory } from "react-router-dom";
import LIKED_CARD from "../home/liked-post";
import LOAD from "../../components/loading.js";
import firebase from "firebase";

const Liked_Shots = ({
  USER,
  set_USER,
  user_Posts,
  setUser_Posts,
  fetch_USER_Posts,
  loading,
  setLoading,
  country,
  setCity,
  city,
  setCountry,
  setState,
  state,
  fetch_About,
  about,
  setAbout,
  LK_posts,
  setLK_posts,
  fetch_LikedShots,
  final_arr,
  setfinal_arr,
}) => {
  const db = firebase.firestore();
  const history = useHistory();

  useEffect(() => {
    if (Object.keys(USER).length !== 0) {
      fetch_About();
      fetch_LikedShots();
    } else {
      history.push("/");
    }
  }, [USER]);

  useEffect(() => {
    if (about && about.length !== 0) {
      console.log(about);
      console.log(about[0].City);
    } else {
      console.log("not running");
    }
  }, [about]);

  useEffect(() => {
    console.log(LK_posts[0]);
    if (LK_posts && LK_posts[0]) {
      setLoading(true);
      if (LK_posts[0].arr && LK_posts[0].arr.length !== 0) {
        console.log(LK_posts[0].arr);
        // console.log(LK_posts[0].arr[0])

        var i, j;
        db.collection("posts/all_posts/all_unverified").onSnapshot(
          (snapshot) => {
            var likedposts_array = [];
            for (i = 0; i < LK_posts[0].arr.length; i++) {
              // array of the user Liked_Post__________ in USER COLLECTION
              for (j = 0; j < snapshot.docs.length; j++) {
                if (LK_posts[0].arr[i] === snapshot.docs[j].id) {
                  console.log(snapshot.docs[j].data());
                  // console.log(snapshot.docs[j].id);
                  likedposts_array.push(snapshot.docs[j].data());
                }
              }
            }
            setfinal_arr(likedposts_array);
          }
        );
        setLoading(false);
      } else if (
        LK_posts[0].ArrOF_LikedPostsID &&
        LK_posts[0].ArrOF_LikedPostsID.length !== 0
      ) {
        setLoading(true);
        console.log(LK_posts[0].ArrOF_LikedPostsID);
        var i, j;
        db.collection("posts/all_posts/all_unverified").onSnapshot(
          (snapshot) => {
            var likedposts_array = [];
            for (i = 0; i < LK_posts[0].ArrOF_LikedPostsID.length; i++) {
              // array of the user Liked_Post__________ in USER COLLECTION
              for (j = 0; j < snapshot.docs.length; j++) {
                if (LK_posts[0].ArrOF_LikedPostsID[i] === snapshot.docs[j].id) {
                  console.log(snapshot.docs[j].data());
                  // console.log(snapshot.docs[j].id);

                  likedposts_array.push(snapshot.docs[j].data());
                }
              }
            }

            setfinal_arr(likedposts_array);
          }
        );
        setLoading(false);
      }
    } else {
      console.log("Not yet Fetched");
    }
  }, [LK_posts, setfinal_arr]);

  // console.log(final_arr);

  return (
    <Container>
      <Row className="rowTopgap">
        <Col md={6} className="profilecontainer">
          <img
            src={USER.Profile_Pic}
            className="rounded-circle proimg"
            alt=" "
            width="180rem"
            height="180rem"
          />
        </Col>

        <Col md={6}>
          <div className="user_data">
            <h2>{USER.Name} </h2>
            <p>{USER.Email}</p>
            {about && about.length !== 0 ? (
              <p>
                {about[0].City}
                {" , "} {about[0].Country}{" "}
              </p>
            ) : (
              <p>Please complete the details ...</p>
            )}
          </div>
        </Col>
      </Row>

      <section>
        <div className="d-flex justify-content-evenly" id="line">
          <div className="subtopic">
            <Link to="/profile"> SHOTS </Link>{" "}
          </div>

          <div className="subtopic">
            <Link to="/favourites">LIKED SHOTS </Link>{" "}
          </div>

          <div className="subtopic">
            <Link to="/about"> ABOUT</Link>{" "}
          </div>
        </div>
      </section>

      <hr></hr>

      <section className="rowTopgap">
        {/* <i className="fas fa-heart profile_icon_heart"></i> */}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div class="sketchy">Favourites ❤️</div>
        </div>

        <Row style={{ padding: "4rem auto" }}>
          {loading ? (
            <LOAD />
          ) : final_arr && final_arr.length !== 0 ? (
            final_arr.map((card) => (
              <Col
                key={card.id}
                sm={12}
                md={4}
                lg={4}
                xl={4}
                className="hovercard"
                style={{ padding: "2rem .6rem", margin: "0rem" }}>
                <LIKED_CARD
                  ID={card.id}
                  each_cardObj={card} // Each Object
                  USER={USER}
                />
              </Col>
            ))
          ) : null}
        </Row>
      </section>
    </Container>
  );
};

export default Liked_Shots;
