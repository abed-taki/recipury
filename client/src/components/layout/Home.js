import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

class Home extends Component {
  render() {
    return (
      <div>
        <section className="home-hero">
          <Navbar />
          <h1 className="main-title">
            Share Your Recipes With Others <br />
            Or Find Ideas For Your Next Meal
          </h1>
          <div className="ctas">
            <Link to="/register" className="cta-primary btn btn-long">
              Get Started
            </Link>
            <Link to="/recipes" className="cta-secondary btn btn-light">
              Brows Recipes
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Home;
