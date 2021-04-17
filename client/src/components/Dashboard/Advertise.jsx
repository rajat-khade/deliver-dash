import React from "react";
import "./Advertise.css"

function Advertise(props){
    return (
        <div className="picture-div">
            <img className="picture" src={require("./images/groceries.png").default} alt="" />
        </div>
    );
}

export default Advertise;