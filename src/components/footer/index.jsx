import React from "react";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <div>
      <footer
        className="bg_image bg_image--1 bg-black text-center text-lg-start"
        data-black-overlay="6">
        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <div className="row for_a">
            <div className="col col-lg-3 col-md-3 col-12 mb-4 mb-md-0">
              <a className="text-light" href="/terms.html">
                Terms and Conditions
              </a>
            </div>
            <div
              className="col col-lg-6 col-md-6 col-12 mb-4 mb-md-0"
              style={{ color: "#c6c3ae", padding: "4px 4px" }}>
              {/* © 2022 Copyright */}
              <a
                className="text-light"
                href="/index.html"
                style={{ color: "#c6c3ae", padding: "0 8px " }}>
                Designed by Niharika Dutta ❤️😃
              </a>
            </div>

            <div className="col col-lg-3 col-md-3 col-12 mb-4 mb-md-0">
              <a className="text-light" href="/privacy.html">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  );
};

export default Footer;
