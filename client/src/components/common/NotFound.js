import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import register from "../../img/register.png";

const NotFound = () => {
  return (
    <div>
      <section className="home-hero">
        <Navbar />
      </section>
      <img
        style={{ margin: "auto", width: "400px", display: "block" }}
        src={register}
        alt="not found"
      />
      <Footer />
    </div>
  );
};

export default NotFound;
