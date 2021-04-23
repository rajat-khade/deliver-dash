import React from "react";
import "./Features.css";

function Features(){
    return (
        <section className="features">
  <div className="cards-intro">
    <div className="container overflow-hidden">
      <div className="row gy-1">
        <div className="feature-box col-lg-4">
          <div className="p-3 border bg-light feature-box-content">
            <h1><i className="fas fa-hamburger icon"></i></h1>
            <p className="icon-text">Best Reviews</p>
          </div>
        </div>
        <div className="feature-box col-lg-4">
          <div className="p-3 border bg-light feature-box-content">
            <h1><i className="fas fa-star icon"></i></h1>
            <p className="icon-text">Highest Rated</p>
          </div>
        </div>
        <div className="feature-box col-lg-4">
          <div className="p-3 border bg-light feature-box-content">
            <h1><i className="fas fa-truck icon"></i></h1>
            <p className="icon-text">Fast Delivery</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}
export default Features;