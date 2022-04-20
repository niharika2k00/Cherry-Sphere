import React from "react";
// import LOGO from "../../assets/logo-light-fot.webp";
import "../../styles/footer.css";

const Footer = () => {
  return (
    <div>
      <footer
        className="bg_image bg_image--1 bg-black text-center text-lg-start"
        data-black-overlay="6">
        <div className="container p-5">
          <div className="row">
            <div className="col-lg-5 col-md-12 mb-4 mb-md-0">
              <a href="/index.html">
                {/* <img src={LOGO} alt="Logo images" width="200" /> */}
              </a>
              <p
                style={{ color: "#c6c9d8", padding: "1rem 0" }}
                className="para">
                "Many businesses, large and small, have a huge source of great
                ideas that can help them improve, innovate and grow, and that's
                what we are here for."
              </p>
            </div>

            <div className="col-lg-3 offset-lg-1 col-md-6 mb-4 mb-md-0 fstyle ">
              <h5 className="text-white mb-md-4 font-weight-bold">
                Grow your business with us
              </h5>

              <ul className="list-unstyled footer_cols fstyle   mb-0">
                <li className="mb-md-2">
                  <a href="/connect.html">Vocal for Local</a>
                </li>
                <li className="mb-md-2">
                  <a href="/connect.html">Corporates</a>
                </li>
                <li className="mb-md-2">
                  <a href="/connect.html">Small-Medium Enterprises</a>
                </li>
                <li className="mb-md-2">
                  <a href="/connect.html">Startups</a>
                </li>
                <li className="mb-md-2">
                  <a href="/connect.html">Influencers</a>
                </li>
                <li>
                  <a href="/connect.html">Others</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 ">
              <h5 className="text-white mb-md-4 font-weight-bold">Connect</h5>

              <ul className="list-unstyled fstyle footer_cols">
                <li className="mb-md-3">
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="/connect.html#map1" className="ml-2">
                    HQ- Rourkela, Odisha, India
                  </a>
                </li>
                <li className="mb-md-3">
                  <i className="fas fa-map-marker-alt"></i>
                  <a href="/connect.html#map2" className="ml-2">
                    OP- Kolkata, West Bengal, India
                  </a>
                </li>
                <li className="mb-md-3">
                  <i className="fas fa-envelope"></i>
                  <a
                    href="mailto:info@theprodigiouspeople.com"
                    className="ml-2">
                    info@theprodigiouspeople.com
                  </a>
                </li>
                <li className="mb-md-3">
                  <i className="fas fa-newspaper"></i>
                  <a
                    href="/service-catalogue.pdf"
                    target="_blank"
                    className="ml-2">
                    Service Catalogue
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container p-4 pb-0 text-center">
          {/* <!-- Section: Social media --> */}
          <section className="mb-4">
            {/* <!-- Facebook --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-facebook"
              href="https://www.facebook.com/prodgspeople"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>

            {/* <!-- Instagram --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-instagram"
              href="https://www.instagram.com/prodgspeople"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-instagram fa-lg"></i>
            </a>

            {/* <!-- Youtube --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-youtube"
              href="https://www.youtube.com/channel/UCpI8MnHEA1KXE2qxw7YgqIA"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-youtube fa-lg"></i>
            </a>

            {/* <!-- Twitter --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-twitter"
              href="https://twitter.com/prodgspeople"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-twitter fa-lg"></i>
            </a>

            {/* <!-- Pinterest --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-pinterest"
              href="https://in.pinterest.com/prodgspeople"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-pinterest fa-lg"></i>
            </a>

            {/* <!-- Tumblr --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-tumblr"
              href="https://prodgspeople.tumblr.com"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-tumblr fa-lg"></i>
            </a>

            {/* <!-- Quora --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-quora"
              href="https://www.quora.com/profile/The-Prodigious-People"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-quora fa-lg"></i>
            </a>

            {/* <!-- Linkedin --> */}
            <a
              className="btn btn-primary btn-floating m-1 btn-lg icon-linkedin"
              href="https://www.linkedin.com/company/theprodigiouspeople"
              target="_blank"
              rel="noreferrer"
              role="button">
              <i className="fab fa-linkedin-in fa-lg"></i>
            </a>
          </section>
        </div>

        <div className="container p-4 pb-0">
          <section className="">
            <form action="">
              <div className="row d-flex justify-content-center">
                <div className="col-auto text-white">
                  <p className="pt-2 para2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="form5Example2"
                      className="form-control"
                    />
                    <label className="form-label" for="form5Example2">
                      Email address
                    </label>
                  </div>
                </div>

                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-outline-light mb-4 subs-submit">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

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
              © 2021 Copyright
              <a
                className="text-light"
                href="/index.html"
                style={{ color: "#c6c3ae", padding: "0 8px " }}>
                Prodigious People LLP.
              </a>
              All Rights Reserved.
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
