import React from "react";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
import behance from "../../img/behance.svg";

const Footer = () => {
  return (
    // <!-- footer -->
    <footer className="footer">
      <div className="container footer-container">
        <a href="/" className="logo">
          Recipury
        </a>
        <p className="legal">
          {new Date().getFullYear()} - All Rights and stuff
        </p>
        <div className="social">
          <a
            href="https://twitter.com/oartjourney"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            href="https://www.instagram.com/oartjourney/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram} alt="instagram" />
          </a>
          <a
            href="https://www.behance.net/pay2taki43ba"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={behance} alt="behance" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
