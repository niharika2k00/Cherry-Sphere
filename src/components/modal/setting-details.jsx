import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import "../../styles/popup.css";
import { colorPalette } from "../../utilities/theme.js";

const Popup = ({
  type,
  setsettingPopup,
  title,
  setTitle,
  setTopic,
  topic,
  Setting_handler,
  Img_handle,
}) => {
  // const db = firebase.firestore();
  // const store = firebase.storage();

  return (
    <div>
      <div className="pop-up">
        <div className="input-box" /* onSubmit={Setting_handler} */>
          <CancelIcon
            onClick={() => setsettingPopup(false)}
            className="cross-btn"
          />
          <h5 style={{ color: colorPalette.main.primary, fontWeight: "600" }}>
            Enter the details :
          </h5>

          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>
                  <div className="modalText">
                    Post Genre <span style={{ color: "crimson" }}>*</span>
                  </div>
                </Form.Label>
                <Form.Control
                  as="select"
                  className="form_box"
                  onChange={(e) => setTopic(e.target.value)}
                  value={topic}>
                  <option>Sci-fi</option>
                  <option>Motivational</option>
                  <option>Memes</option>
                  <option>Technology</option>
                  <option>Travel</option>
                  <option>Art</option>
                  <option>Others</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="title">
                <Form.Label>
                  <div className="modalText">
                    Post Heading <span style={{ color: "crimson" }}>*</span>{" "}
                  </div>
                </Form.Label>
                <Form.Control
                  className="form_box"
                  type="title"
                  placeholder="add a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required></Form.Control>
              </Form.Group>
            </Col>

            <Col md={4}>
              <div
                className="card"
                style={{ width: "18rem" }}
                className="pro_card">
                <div className="card-body">
                  {/* <h5 className="card-title">Upload Cover Picture</h5> */}

                  <Form.Group style={{ color: "black" }}>
                    <Form.File
                      id="exampleFormControlFile1"
                      label="Upload Cover Picture *"
                      onChange={Img_handle}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>

          <div className="btncenter">
            <Button type="button" variant="danger" onClick={Setting_handler}>
              <b style={{ fontSize: "0.8rem" }}>Save Details</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
