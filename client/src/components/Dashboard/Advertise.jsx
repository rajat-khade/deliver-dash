import React from "react";
import "./Advertise.css"

function Advertise({ color, image }){
    return (
        <div className={`picture-div ${color}`}>
            <img className="picture" src={image} alt="" />
        </div>
    );
}

export default Advertise;