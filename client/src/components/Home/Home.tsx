import React from "react";

import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <header>
        <div className="content">
          <h2>Buy Smarter</h2>
          <h2>Drive Happier!</h2>
          <p>
          Research And Find What's Right for You.
          Use our extensive database to research and filter trims
          so you can find the car that fits your life.
          </p>
          <a href="/cars-board">View Cars List</a>
        </div>
        <div className="imgBox">
          <img
            src="https://www.autoauctionmall.com/static/images/hero-cars.png"
            alt=""
          />
        </div>
      </header>
    </div>
  );
};

export default Home;
