import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import RecipeFeed from "./RecipeFeed";

const Feed = () => {
  return (
    <div>
      <section className="home-hero">
        <Navbar />
      </section>
      <h2 className="third-title">All Recipes</h2>
      <RecipeFeed />
      <Footer />
    </div>
  );
};

export default Feed;
