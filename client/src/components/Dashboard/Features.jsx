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
            <h1><i className="fas fa-hamburger fa-2x icon"></i></h1>
            <p className="icon-text">best reviews</p>
          </div>
        </div>
        <div className="feature-box col-lg-4">
          <div className="p-3 border bg-light feature-box-content">
            <h1><i className="fas fa-star fa-2x icon"></i></h1>
            <p className="icon-text">highest rated</p>
          </div>
        </div>
        <div className="feature-box col-lg-4">
          <div className="p-3 border bg-light feature-box-content">
            <h1><i className="fas fa-truck fa-2x icon"></i></h1>
            <p className="icon-text">fast delivery</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}
export default Features;