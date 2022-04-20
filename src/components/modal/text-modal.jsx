import React from "react";
import { Button, Form } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";
import "../../styles/popup.css";

const Popup = ({
  setPopup,
  description,
  setDescription,
  Description_handler,
}) => {
  return (
    <div>
      <div className="pop-up">
        <div className="input-box">
          <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />

          <div className="modalText"> Content of your post : </div>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="write something..."
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <div className="btncenter">
            <Button
              type="button"
              // variant="danger"
              className="ButtonStyle2"
              onClick={Description_handler}>
              <b style={{ fontSize: "14px" }}> Add Content</b>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
