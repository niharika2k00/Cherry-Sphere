import React, { useState, useEffect } from "react";
import firebase from "firebase";
import app from "./firebase/firebase.js";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavigationBar from "./components/navbar/index.jsx";
import Footer from "./components/footer/index.jsx";
import HomeScreen from "./screens/home/index.jsx";
import ProfileScreen from "./screens/profile/index";
import UploadPostScreen from "./components/UploadShot/index.jsx";
import PostScreen from "./screens/post/index.jsx";
import ProfileAbout from "./screens/profile/about.jsx";
import ProfileFavouritePost from "./screens/profile/favourite.jsx";
import PublicProfile from "./screens/profile/public-profile";

const App = () => {
  const db = firebase.firestore();
  const store = firebase.storage();

  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg_Success, setMsg_Success] = useState(null);
  const [msg_Warn, setMsg_Warn] = useState(null);
  const [USER, set_USER] = useState({});
  const [Profile_Image, setProfile_Image] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [allPost, setallPost] = useState([]);
  const [user_Posts, setUser_Posts] = useState([]);
  const [Person, setPerson] = useState({});
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState([]);
  const [LK_posts, setLK_posts] = useState([]);
  const [final_arr, setfinal_arr] = useState([]); // for the Liked Post Display

  const USER_DETAILS = firebase.auth().currentUser;
  // console.log(USER_DETAILS);

  const profile_img_handle = (e) => {
    if (e.target.files[0]) setProfile_Image(e.target.files[0]);
  };

  const Upload_ProfileImg = async () => {
    try {
      const a = store.ref().child(`Profile_Image/${Profile_Image.name}`);
      await a.put(Profile_Image);
      const downloadURL = await a.getDownloadURL();

      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------  USER VALIDATION    --------------------
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        // both present
        console.log("USER EXIST");
        console.log(user.displayName, " , ", user.uid);
        const User_Obj = {
          Name: user.displayName,
          Email: user.email,
          UID: user.uid,
          Profile_Pic: user.photoURL,
        };
        console.log(User_Obj);
        set_USER(User_Obj);
      } else {
        console.log("No User");
        set_USER({});
      }
    });
  }, [set_USER]);

  /* useEffect(() => {
    if (Object.keys(USER).length === 0) {
      setTimeout(function () {
        console.log('loggin immediately');
        setSignUp(true);
      }, 6000);
    }
    else {
      setSignUp(false);
      console.log("GOOOOD PERSON")
    }
  }, [USER]); */

  // Fetching ALL the posts of ALL THE USERS
  const fetch_ALL_Users_Posts = () => {
    db.collection("posts/all_posts/all_unverified").onSnapshot((snapshot) => {
      const listItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(listItems);
      setallPost(listItems);
    });
  };

  //  Fetching all the posts of THE LOGGED IN  USERS
  const fetch_USER_Posts = () => {
    if (Object.keys(USER).length !== 0) {
      console.log("Logged In. ");
      console.log(USER_DETAILS.uid);

      // fetching only the logged In Users Posts
      db.collection("users")
        .doc(USER_DETAILS.uid)
        .collection("posts")
        .onSnapshot((snapshot) => {
          const User_All_Posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(User_All_Posts);
          setUser_Posts(User_All_Posts);
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  //  Fetching the ABOUT DETAILS of the Logged In USER
  const fetch_About = () => {
    if (Object.keys(USER).length !== 0) {
      db.collection("users")
        .doc(USER_DETAILS.uid)
        .collection("about")
        .onSnapshot((snapshot) => {
          const User_About = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log(User_About);
          setAbout(User_About);
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  // Fetching all the Liked Posts of a Particular User
  const fetch_LikedShots = async () => {
    if (Object.keys(USER).length !== 0) {
      db.collection("users")
        .doc(USER_DETAILS.uid)
        .collection("liked_posts")
        .onSnapshot((snapshot) => {
          let likedpostsArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          // console.log(likedpostsArray);
          setLK_posts(likedpostsArray);
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  };

  return (
    <Router>
      <div className="App" style={{ backgroundColor: "white" }}>
        <NavigationBar
          signUp={signUp}
          setSignUp={setSignUp}
          login={login}
          setLogin={setLogin}
          USER={USER}
          set_USER={set_USER}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmpass={confirmpass}
          setConfirmpass={setConfirmpass}
          Profile_Image={Profile_Image}
          setProfile_Image={setProfile_Image}
          profile_img_handle={profile_img_handle}
          Upload_ProfileImg={Upload_ProfileImg}
        />

        <main>
          <Route
            path="/"
            render={(props) => (
              <HomeScreen
                {...props}
                USER={USER}
                set_USER={set_USER}
                allPost={allPost}
                setallPost={setallPost}
                fetch_ALL_Users_Posts={fetch_ALL_Users_Posts}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            exact
          />

          <Route
            path="/profile"
            render={(props) => (
              <ProfileScreen
                {...props}
                USER={USER}
                set_USER={set_USER}
                user_Posts={user_Posts}
                setUser_Posts={setUser_Posts}
                fetch_USER_Posts={fetch_USER_Posts}
                loading={loading}
                setLoading={setLoading}
                city={city}
                state={state}
                country={country}
                fetch_About={fetch_About}
                about={about}
                setAbout={setAbout}
              />
            )}
            exact
          />

          <Route
            path="/about"
            render={(props) => (
              <ProfileAbout
                {...props}
                USER={USER}
                set_USER={set_USER}
                user_Posts={user_Posts}
                setUser_Posts={setUser_Posts}
                fetch_USER_Posts={fetch_USER_Posts}
                loading={loading}
                setLoading={setLoading}
                setCity={setCity}
                city={city}
                setCountry={setCountry}
                setState={setState}
                state={state}
                country={country}
                fetch_About={fetch_About}
                about={about}
                setAbout={setAbout}
                msg_Warn={msg_Warn}
                setMsg_Warn={setMsg_Warn}
                msg_Success={msg_Success}
                setMsg_Success={setMsg_Success}
              />
            )}
            exact
          />

          <Route
            path="/favourites"
            render={(props) => (
              <ProfileFavouritePost
                {...props}
                USER={USER}
                set_USER={set_USER}
                user_Posts={user_Posts}
                setUser_Posts={setUser_Posts}
                fetch_USER_Posts={fetch_USER_Posts}
                loading={loading}
                setLoading={setLoading}
                setCity={setCity}
                city={city}
                setCountry={setCountry}
                setState={setState}
                state={state}
                country={country}
                fetch_About={fetch_About}
                about={about}
                setAbout={setAbout}
                fetch_LikedShots={fetch_LikedShots}
                LK_posts={LK_posts}
                setLK_posts={setLK_posts}
                final_arr={final_arr}
                setfinal_arr={setfinal_arr}
              />
            )}
            exact
          />

          <Route
            path="/upload"
            render={(props) => (
              <UploadPostScreen
                {...props}
                USER={USER}
                set_USER={set_USER}
                loading={loading}
                setLoading={setLoading}
                msg_Warn={msg_Warn}
                setMsg_Warn={setMsg_Warn}
                msg_Success={msg_Success}
                setMsg_Success={setMsg_Success}
              />
            )}
            exact
          />

          <Route
            path="/post/:id"
            render={(props) => (
              <PostScreen
                {...props}
                USER={USER}
                set_USER={set_USER}
                allPost={allPost}
                setallPost={setallPost}
                fetch_ALL_Users_Posts={fetch_ALL_Users_Posts}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            exact
          />

          <Route
            path="/user/:id"
            render={(props) => (
              <PublicProfile
                {...props}
                USER={USER}
                set_USER={set_USER}
                allPost={allPost}
                setallPost={setallPost}
                fetch_ALL_Users_Posts={fetch_ALL_Users_Posts}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            exact
          />
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
