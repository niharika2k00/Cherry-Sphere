import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import { useHistory } from "react-router-dom";
import ExploreLOGO from "../../assets/explorepng.png";
import { useLocation } from "react-router-dom";
import SIGNUP_POPUP from "../Authentication/SignUp.jsx";
import Login from "../Authentication/Login.jsx";
import app from "../../firebase/firebase.js";

const Navbar_top = ({
  signUp,
  setSignUp,
  login,
  setLogin,
  USER,
  set_USER,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmpass,
  setConfirmpass,
  Profile_Image,
  setProfile_Image,
  profile_img_handle,
  Upload_ProfileImg,
}) => {
  //
  const location = useLocation();
  const history = useHistory();
  const modify_url = location.pathname;
  // console.log(location.pathname);  // /post/:id

  const handle_LogOut = () => {
    app.auth().signOut();
    console.log("Successfully Logged out ", name);
    set_USER({});
    history.push("/");
  };

  console.log(USER);

  return (
    <header>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        style={{ padding: ".6rem", marginbottom: "0" }}>
        <LinkContainer to="/">
          <Navbar.Brand id="nav_head">
            <img id="explore" src={ExploreLOGO} alt="EXPLORE" />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto navItems">
            <Nav.Link>
              <Link to="/" className="modiflink nav_top">
                HOME
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link to="/upload" className="modiflink nav_top">
                POST
              </Link>
            </Nav.Link>

            {Object.keys(USER).length !== 0 && (
              <Nav.Link>
                <Link to="/profile" className="modiflink nav_top">
                  PROFILE
                </Link>
              </Nav.Link>
            )}
          </Nav>

          {/* --------------  LOGIN  POPUP   -- for exsisting user------------ */}
          {login && (
            <Login
              type="logIn"
              setLogin={setLogin}
              setSignUp={setSignUp}
              email={email}
              setEmail={setEmail}
              password={password}
              name={name}
              setPassword={setPassword}
            />
          )}

          {/* --------------  SIGNUP  POPUP -- for new user ------------ */}
          {signUp && (
            <SIGNUP_POPUP
              type="signUp"
              setSignUp={setSignUp}
              setLogin={setLogin}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmpass={confirmpass}
              setConfirmpass={setConfirmpass}
              USER={USER}
              set_USER={set_USER}
              Profile_Image={Profile_Image}
              setProfile_Image={setProfile_Image}
              profile_img_handle={profile_img_handle}
              Upload_ProfileImg={Upload_ProfileImg}
            />
          )}

          {/* <h5 onClick={() => setLogin(true)} id="signinbtn">Sign in </h5> */}

          {Object.keys(USER).length !== 0 ? (
            <section className="Button">
              <button
                className="Button-btn"
                onClick={() => handle_LogOut()}
                style={{ marginRight: "1rem" }}>
                Log Out
              </button>
            </section>
          ) : (
            <section className="Button">
              <button
                className="Button-btn"
                onClick={() => setSignUp(true)}
                style={{ marginRight: "1rem" }}>
                Sign In
              </button>
            </section>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Navbar_top;
