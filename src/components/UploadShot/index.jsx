import React, { useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import "../../styles/uploadShot.scss";
import "../../styles/popup.css";
import "../../styles/border.scss";
import POPUP from "../modal/text-modal.jsx";
import LOAD from "../loading.js";
import MESS from "../message.js";
import SETTING from "../modal/setting-details.jsx";
import firebase from "firebase";
// import moment from 'moment';

const UploadShot_Screen = ({
  USER,
  set_USER,
  loading,
  setLoading,
  msg_Warn,
  setMsg_Warn,
  msg_Success,
  setMsg_Success,
}) => {
  const db = firebase.firestore();
  const store = firebase.storage();

  const [popup, setPopup] = useState(false);
  const [setting, setsettingPopup] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Memes");
  const [img, setImg] = useState(null);
  // const [URL, setURL] = useState(null);
  const [files, setFiles] = useState([]);
  const [files_link, setFiles_Link] = useState([]);

  // SETTING METHOD --- (inside PopupSetting.js)
  const Setting_handler = async (e) => {
    e.preventDefault();
    console.log("setting handler executed");
    setsettingPopup(false);
  };

  // ----------   MULTIPLE IMAGE UPLOAD METHOD     -----------
  const MultipleFile_Onchange = async (e) => {
    e.preventDefault();
    console.log("multiple_onchange execute");
    const tempFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
      tempFiles.push(newFile);
    }
    setFiles(tempFiles);
  };

  const Upload_multi = async () => {
    const Multi_array = [];
    setFiles_Link([]);

    console.log("starting loop");
    for (let i = 0; i < files.length; i++) {
      console.log("inside loop before uploading", i);
      // const uploadTask = firebase.storage().ref().child(`Files/${files[i].name}`).put(files[i]);
      const fileRef = await store.ref().child(`Files/${files[i].name}`);
      await fileRef.put(files[i]);
      const MultidownloadURL = await fileRef.getDownloadURL();

      console.log("MultidownloadURL = ", MultidownloadURL);
      Multi_array.push(MultidownloadURL);
    }
    console.log("Array = ", Multi_array);
    return Multi_array;
  };

  // ----------   SINGLE IMAGE UPLOAD METHOD     -----------
  const Img_handle = (e) => {
    if (e.target.files[0]) setImg(e.target.files[0]);
  };

  const Upload_single = async () => {
    try {
      // const UploadImage = store.ref(`Images/Cover_pics/${img.name}`).put(img);

      // Syntx :  UploadImage.on(string , snapshot  , error  , callback )
      /*  UploadImage.on("state_Change_success",
                 snapshot => { },
                 function error(err) {
                     console.log(err);
                 },
                 async () => {
                     const url = await store.ref("Images/Cover_pics").child(img.name).getDownloadURL();
                     console.log("URL = ", url);
                     setURL(url);             
                 }
             ) */

      // const downloadURL = await store.ref().child(`Images/Cover_pics/${img.name}`).getDownloadURL();
      const a = store.ref().child(`Images/Cover_pics/${img.name}`);
      await a.put(img);
      const downloadURL = await a.getDownloadURL();

      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  const Description_handler = (e) => {
    e.preventDefault();
    console.log("description added");
    setPopup(false);
  };

  // -----------------    FINAL UPLOAD(submit) POST HANDLER   --------------------
  const submitPostHandler = async (e) => {
    e.preventDefault();

    try {
      setMsg_Warn(null);
      setLoading(true);
      const SINGLE = await Upload_single();
      console.log("SINGLE ", SINGLE);
      const MULTIPLE = await Upload_multi();
      console.log("MULTIPLE ", MULTIPLE);
      setLoading(false);

      // Timestamp
      const date = new Date();
      const addingDate = `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
      })}, ${date.getFullYear()}`; // 12 May, 2021

      if (
        topic &&
        title &&
        SINGLE.length !== 0 &&
        description &&
        MULTIPLE.length !== 0
      ) {
        setLoading(true);
        const USER = firebase.auth().currentUser;
        const POST = await db
          .collection("users")
          .doc(USER.uid)
          .collection("posts")
          .add({
            Topic: topic,
            Title: title,
            Display_Name: USER.displayName,
            Cover_Image: SINGLE,
            Description: description,
            Files: MULTIPLE,
            Posted_On: addingDate,
          });

        // console.log(POST.id);
        // ****************      GLOBAL STORAGE        ********************
        await db.collection("posts/all_posts/all_unverified").doc(POST.id).set({
          Topic: topic,
          Title: title,
          Display_Name: USER.displayName,
          User_UID: USER.uid,
          Cover_Image: SINGLE,
          Description: description,
          Files: MULTIPLE,
          Posted_On: addingDate,
          Like_count: 0,
        });

        console.log("Succesfully POST submitted");
        setLoading(false);

        setMsg_Success("Post Submitted Successfully !!");
        setDescription("");
        setTitle("");
        setTopic("");
      } else {
        setMsg_Warn("Please fill all the fields to proceed further !!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Container className="self_container">
        {/* <h1 className="loginhead">POST</h1> */}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div class="sketchy">
            Upload Post <i className="fas fa-cloud-upload-alt ico_big"></i>
          </div>
        </div>

        {msg_Warn && <MESS variant="danger">{msg_Warn}</MESS>}
        {msg_Success && <MESS variant="success">{msg_Success}</MESS>}

        {loading ? (
          <LOAD />
        ) : (
          <Row className="justify-content-md-center  myrow">
            <Col md={12} lg={12} xs={12} style={{ padding: "1rem 0rem" }}>
              <Form id="login_form" onSubmit={submitPostHandler}>
                <Form.Group controlId="title">
                  <h5 style={{ color: "#ffa200", paddingBottom: "1.4rem" }}>
                    Steps to be followed...
                  </h5>

                  {/* <Form.Label>
                    <b style={{ fontSize: "1.2rem" }}>
                      Settings<span style={{ color: "red" }}>*</span>{" "}
                    </b>
                  </Form.Label> */}

                  {setting && (
                    <SETTING
                      type="setting"
                      setsettingPopup={setsettingPopup} /* true paasss */
                      title={title}
                      setTitle={setTitle}
                      topic={topic}
                      setTopic={setTopic}
                      Setting_handler={Setting_handler}
                      Img_handle={Img_handle}
                    />
                  )}

                  {/* Multiple Images Upload */}
                  {/*  <Form.Label>
                    <b style={{ fontSize: "1.2rem" }}>
                      Upload Image{" "}
                      <i className="fas fa-cloud-upload-alt ico_big"></i>
                      <span style={{ paddingLeft: "6px", color: "red" }}>
                        *
                      </span>
                    </b>
                  </Form.Label> */}

                  <div
                    className="d-flex justify-content-around py-5"
                    style={{
                      flexDirection:
                        window.innerWidth <= 450 ? "column" : "row",
                    }}>
                    <div>
                      <div className="file file--upload">
                        <label onClick={() => setsettingPopup(true)}>
                          <i className="fas fa-cogs ico_big"></i>
                        </label>
                      </div>

                      <p style={{ color: "black", marginLeft: "1rem" }}>
                        Step 1 : Settings
                      </p>
                    </div>

                    <div>
                      <div className="file file--upload">
                        <label htmlFor="input-file">
                          <i className="fas fa-images ico_big"></i>
                        </label>
                        <input
                          id="input-file"
                          type="file"
                          multiple
                          onChange={MultipleFile_Onchange}
                        />
                      </div>
                      <p style={{ color: "black", marginLeft: "1rem" }}>
                        Step 2 : Upload Images
                      </p>
                    </div>

                    {/* --------------    POPUP  ------------ */}
                    {popup && (
                      <POPUP
                        setPopup={setPopup} /* true paasss */
                        description={description}
                        setDescription={setDescription}
                        Description_handler={Description_handler}
                      />
                    )}

                    <div>
                      <div className="file file--upload">
                        <label htmlFor="text" onClick={() => setPopup(true)}>
                          <i className="fas fa-text-height ico_big"></i>
                        </label>
                      </div>
                      <p style={{ color: "black", marginLeft: "1rem" }}>
                        {" "}
                        Step 3 : Content
                      </p>
                    </div>
                  </div>
                </Form.Group>

                {/* <Form.Group controlId="title"></Form.Group> */}

                <div className="Button">
                  <button
                    type="submit"
                    disabled={loading}
                    className="Button-btn"
                    style={{ marginTop: "1px" }}>
                    Submit Post
                  </button>
                </div>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default UploadShot_Screen;
