import React, { useState, useEffect } from "react";
import { Row, Col, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import "../../App.css";
import "../../styles/homescreen.css";
import EACH_CARD from "./card.jsx";
import LOAD from "../../components/loading.js";
import { clone } from "ramda";

const HomeScreen = ({
  USER,
  set_USER,
  allPost,
  setallPost,
  fetch_ALL_Users_Posts,
  loading,
  setLoading,
}) => {
  // --------- FILTER FUNCTIONALITY ----------
  const [currentPost, setcurrentPost] = useState([]);
  const [activee, setActivee] = useState("");

  const sort = (Topic) => {
    if (!Topic) {
      setcurrentPost(allPost);
      setActivee("");
    } else {
      let arr = clone(allPost);
      setActivee(Topic);
      arr = arr.filter((obj) => obj.Topic === Topic);
      setcurrentPost(arr);
    }
  };

  useEffect(() => {
    setcurrentPost(allPost);
  }, [allPost]);

  // FETCHING ALL THE POSTS OF ALL THE USERS
  useEffect(() => {
    setLoading(true);
    fetch_ALL_Users_Posts();
  }, []);

  useEffect(() => {
    console.log("All Posts ==> ", allPost);
    setLoading(false);
  }, [allPost, set_USER]);

  var width = window.innerWidth;

  return (
    <div>
      <section>
        <div className="jumbotron">
          <Row>
            <Col md={6} xs={12}>
              <div className="title">
                <h1>Every second of life is a New Exploration !!</h1>
              </div>

              <p className="lead">
                Lets explore art & travel experiences globally and gets
                motivated together in life...
              </p>
            </Col>
          </Row>
        </div>
      </section>

      {/* <div className={`filterdropdown ${show ? 'show' : ''}`}>This is a dropdown div.</div> */}

      <Container className="self_container-Bottomgap">
        <section>
          <Row id="gap_top">
            {width <= 450 ? (
              // ---------  DROPDOWN (mobile response)  -----------
              <div className="d-flex flex-wrap justify-content-end">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      Filter <i className="fas fa-filter"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => sort("")}>
                        <Link to="">All </Link>{" "}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Motivational")}>
                        <Link to=""> Motivational</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Memes")}>
                        <Link to="">Memes</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Technology")}>
                        <Link to="">Technology </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Travel")}>
                        <Link to="">Travel </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Art")}>
                        <Link to=""> Art</Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Others")}>
                        <Link to="">Others </Link>{" "}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => sort("Sci-fi")}>
                        <Link to=""> Sci-fi </Link>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ) : (
              /* // ---------  LINE (desktop mode response)  ----------- */
              <div className="d-flex flex-wrap justify-content-evenly">
                <ul id="tab">
                  <li onClick={() => sort("")}>
                    <Link to="" className={activee === "" ? "activee" : ""}>
                      All
                    </Link>
                  </li>

                  <li onClick={() => sort("Sci-fi")}>
                    <Link
                      to=""
                      className={activee === "Sci-fi" ? "activee" : ""}>
                      Sci-fi
                    </Link>
                  </li>

                  <li onClick={() => sort("Motivational")}>
                    <Link
                      to=""
                      className={activee === "Motivational" ? "activee" : ""}>
                      Motivational
                    </Link>
                  </li>

                  <li onClick={() => sort("Memes")}>
                    <Link
                      to=""
                      className={activee === "Memes" ? "activee" : ""}>
                      Memes
                    </Link>
                  </li>

                  <li onClick={() => sort("Technology")}>
                    <Link
                      to=""
                      className={activee === "Technology" ? "activee" : ""}>
                      Technology
                    </Link>
                  </li>

                  <li onClick={() => sort("Travel")}>
                    <Link
                      to=""
                      className={activee === "Travel" ? "activee" : ""}>
                      Travel
                    </Link>
                  </li>

                  <li onClick={() => sort("Art")}>
                    <Link to="" className={activee === "Art" ? "activee" : ""}>
                      Art
                    </Link>
                  </li>

                  <li onClick={() => sort("Others")}>
                    <Link
                      to=""
                      className={activee === "Others" ? "activee" : ""}>
                      Others
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </Row>
        </section>

        {loading && allPost.length > 0 ? (
          <LOAD />
        ) : (
          <section style={{ padding: "1rem 0 ", margin: "1rem 0" }}>
            <Row style={{ padding: "3rem auto" }}>
              {currentPost.map((card) => (
                <Col
                  key={card.id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                  className="hovercard"
                  style={{ padding: "2rem .6rem", margin: "0rem" }}>
                  <EACH_CARD ID={card.id} each_cardObj={card} USER={USER} />
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
