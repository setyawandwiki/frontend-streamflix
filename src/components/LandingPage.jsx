import React from "react";
import Poster from "./Poster";
import SuperHero from "./Superhero";
import Trending from "./Trending";

const LandingPage = () => {
  return (
    <>
      <Poster />
      <div className="trending">
        <Trending />
      </div>
      <div className="superhero">
        <SuperHero />
      </div>
    </>
  );
};

export default LandingPage;
