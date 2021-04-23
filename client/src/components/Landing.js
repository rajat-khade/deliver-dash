import React from 'react'
import {useHistory} from "react-router-dom"
import Signup from './Signup/Signup.js';
import './Landing.css'

const Landing = () => {
    let history = useHistory()
    return (
        <div className="landing-container">
            <div 
                style={{
                    width: '50%', 
                    height: '100%', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'}}
                >
                <div className="signup-form">
                    <Signup />
                </div>
            </div>
            <div style={{ width: '3px', height: '100%', display: 'flex', alignItems: 'center'}}>
                <div style={{width: '100%', height: '90%', backgroundColor: 'rgb(51 51 51)', borderRadius: '5px'}} />
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
