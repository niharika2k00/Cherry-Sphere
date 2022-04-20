import React, { useEffect } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/profile.css";
import "../../styles/homescreen.css";
import "../../styles/navbar.css";
import "../../styles/border.scss";
import "../../App.css";
import { useHistory } from "react-router-dom";
import LOAD from "../../components/loading.js";
import MESS from "../../components/message.js";
import firebase from "firebase";

const About = ({
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
  msg_Warn,
  setMsg_Warn,
  msg_Success,
  setMsg_Success,
}) => {
  const db = firebase.firestore();
  const history = useHistory();

  const aboutFormHandler = async (e) => {
    e.preventDefault();
    try {
      // --------- Putting into DB --------
      const USER_CURRENT = firebase.auth().currentUser;
      console.log(USER_CURRENT);
      const About = {
        Country: country,
        City: city,
        State: state,
      };
      console.log(About);
      await db
        .collection("users")
        .doc(USER_CURRENT.uid)
        .collection("about")
        .add(About);
      setMsg_Success("Successfully Submitted ...");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(USER).length !== 0) {
      fetch_About();
    } else {
      history.push("/");
    }
  }, [USER]);

  useEffect(() => {
    if (about && about.length !== 0) {
      console.log(about);
      console.log(about[0].City);
      setCountry(about[0].Country || "");
      setState(about[0].State || "");
      setCity(about[0].City || "");
    } else {
      console.log("not running");
    }
  }, [about]);

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

      <section>
        {msg_Warn && <MESS variant="danger">{msg_Warn}</MESS>}
        {msg_Success && <MESS variant="success">{msg_Success}</MESS>}

        <Row className="justify-content-md-center rowTopgap">
          <Col md={6} xs={12} sm={11}>
            {/* <Loginform_Container> */}
            {/* <h2 className="profile_head">ABOUT</h2> */}

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div class="sketchy">About</div>
            </div>

            <Form onSubmit={aboutFormHandler} id="about">
              <Form.Group controlId="name">
                <Form.Label>
                  <b>Name</b>
                </Form.Label>
                <Form.Control
                  className="form_box"
                  type="name"
                  placeholder=" name"
                  value={USER.Name}></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>
                  <b>Email Address</b>
                </Form.Label>
                <Form.Control
                  className="form_box"
                  type="email"
                  placeholder=" email"
                  value={USER.Email}></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirmpassword">
                <Form.Label>
                  <b>Country</b>
                </Form.Label>
                <Form.Control
                  className="form_box"
                  type="country"
                  placeholder="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}></Form.Control>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="confirmpassword">
                    <Form.Label>
                      <b>State</b>
                    </Form.Label>
                    <Form.Control
                      className="form_box"
                      type="state"
                      placeholder="state"
                      // value={(about && about.length !== 0) ? about[0].State : state}
                      value={state}
                      onChange={(e) => setState(e.target.value)}></Form.Control>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group controlId="confirmpassword">
                    <Form.Label>
                      <b>City</b>
                    </Form.Label>
                    <Form.Control
                      className="form_box"
                      type="city"
                      placeholder="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}></Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <section className="Button">
                  <button
                    type="submit"
                    className="Button-btn"
                    style={{
                      marginTop: "3rem",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    Submit
                  </button>
                </section>
              </Row>
            </Form>
            {/* </Loginform_Container> */}
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default About;
