import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";

const Post_Card = ({ ID, each_cardObj, USER }) => {
  const db = firebase.firestore();
  const USER_CURRENT = firebase.auth().currentUser;
  const [fetchLIKED_POSTS_arr, setfetchLIKED_POSTS_arr] = useState([]);

  useEffect(() => {
    if (Object.keys(USER).length !== 0) {
      db.collection("users")
        .doc(USER_CURRENT.uid)
        .collection("liked_posts")
        .onSnapshot((snapshot) => {
          let LIKED_POSTS_arr = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));

          if (LIKED_POSTS_arr.length) {
            // let obj = Object.values(LIKED_POSTS_arr[0])[0]
            // console.log(LIKED_POSTS_arr)
            let obj = LIKED_POSTS_arr[0];
            let val = Object.values(obj);
            // console.log(val)
            // console.log(val[0]);
            setfetchLIKED_POSTS_arr(val[0]);
          }
        });
    } else {
      console.log("Currently No User Logged In. ");
    }
  }, [USER, setfetchLIKED_POSTS_arr]);

  const Duplicate_Id_tracer = (arr, id) => {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === id) {
        count++;
      }
    }
    return count;
  };

  const likePost_Handler = async (e) => {
    e.preventDefault();
    var CLICKED_POST_ID = ID;
    console.log("CLICKED_POST_ID  : ", CLICKED_POST_ID);

    try {
      // CAN ALSO BE USED THIS INSTEAD OF ...... SPREAD OPERATOR
      /*  let TempStorage = [];
             for (var i = 0; i < fetchLIKED_POSTS_arr.length; i++) {
                 TempStorage.push(fetchLIKED_POSTS_arr[i]);
             }
             console.log(TempStorage) */

      let ArrOF_LikedPostsID = [...fetchLIKED_POSTS_arr]; // local variable (ARRAY)
      ArrOF_LikedPostsID.push(ID);
      console.log(ArrOF_LikedPostsID);

      // const ans = ArrOF_LikedPostsID.includes(CLICKED_POST_ID);

      const num_of_ID_present = Duplicate_Id_tracer(ArrOF_LikedPostsID, ID);
      console.log(num_of_ID_present);

      const Coll_Size = await db
        .collection("users")
        .doc(USER_CURRENT.uid)
        .collection("liked_posts")
        .get();
      // console.log(Coll_Size.size);
      // console.log(Coll_Size.docs[0].id);

      // LikePost.id  ===== Coll_Size.docs[0].id   {SAME}
      if (Coll_Size.size > 0 && num_of_ID_present < 2) {
        // COLLECTION EXSIST
        // Add an element to the exsisting array
        // Increment +1 in the Global Post

        db.collection("users")
          .doc(USER_CURRENT.uid)
          .collection("liked_posts")
          .doc(Coll_Size.docs[0].id)
          .set({ ArrOF_LikedPostsID } /* , { merge: true } */);
        db.collection("posts/all_posts/all_unverified")
          .doc(CLICKED_POST_ID)
          .update({ Like_count: firebase.firestore.FieldValue.increment(1) });
      } else if (Coll_Size.size > 0 && num_of_ID_present > 1) {
        // COLLECTION EXSIST && ALREADY LIKED

        console.log("YOU HAVE ALREADY LIKED THIS POST !!");
        db.collection("posts/all_posts/all_unverified")
          .doc(CLICKED_POST_ID)
          .update({ Like_count: firebase.firestore.FieldValue.increment(-1) });
        const arr = ArrOF_LikedPostsID.filter((x) => x !== ID);
        db.collection("users")
          .doc(USER_CURRENT.uid)
          .collection("liked_posts")
          .doc(Coll_Size.docs[0].id)
          .set({ arr } /* , { merge: true } */);
      } else {
        const LikePost = await db
          .collection("users")
          .doc(USER_CURRENT.uid)
          .collection("liked_posts")
          .add({ ArrOF_LikedPostsID }); // Create Collection
        db.collection("posts/all_posts/all_unverified")
          .doc(CLICKED_POST_ID)
          .update({ Like_count: firebase.firestore.FieldValue.increment(1) });
        console.log(LikePost.id);
        // alert("Message summited Successfully!");
      }

      setfetchLIKED_POSTS_arr(ArrOF_LikedPostsID);
    } catch (err) {
      console.log(err);
    }
  };

  const setStyleColor = () => {
    if (fetchLIKED_POSTS_arr.includes(ID)) return "red";
    return "white";
  };

  return (
    <div>
      <div
        className="card "
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.496)",
          width: "100%",
        }}>
        <Link to={`/post/${ID}`}>
          <img
            src={each_cardObj.Cover_Image}
            className="card-img-top"
            alt="..."
            style={{ height: "16rem" }}
          />
        </Link>

        <div className="card_overlay">
          <div className="overlay_text" style={{ color: "white" }}>
            <div
              className="d-flex justify-content-around"
              style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
              <div> {each_cardObj.Title}</div>
              <div onClick={likePost_Handler}>
                <i
                  className="fas fa-heart"
                  style={{
                    padding: "2px 2px 1px 1rem",
                    color: setStyleColor(),
                    fontSize: "1.4rem",
                  }}></i>
                {each_cardObj.Like_count}{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post_Card;
