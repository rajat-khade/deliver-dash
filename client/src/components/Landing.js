import React from 'react'
import {useHistory} from "react-router-dom"
import Feedback from './Feedback/Feedback.js';
import './Landing.css'

const Landing = () => {
    let history = useHistory()
    return (
        <div className="landing-container">
            <div className="signup-form">
                <Feedback />
            </div>
            <div className="buttonWraper">
            <button className="customer-button" onClick = {()=>history.push("/customer/login")} ><h4 className="button-name">Customer</h4></button>
            <button className="retailer-button" onClick = {()=>history.push("/retailer/login")} ><h4 className="button-name">Retailer</h4></button>
            <button className="wholesaler-button" onClick = {()=>history.push("/wholesaler/login")} ><h4 className="button-name">Wholesaler</h4></button>
            <button className="logistics-button" onClick = {()=>history.push("/delivery/login")} ><h4 className="button-name">Logistics</h4></button>
            </div>
            
        </div>
    )
}

export default Landing;
