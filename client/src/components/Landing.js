import React from 'react'
import {useHistory} from "react-router-dom"
import "./../styles/Landing.css"

const Landing = () => {
    let history = useHistory()
    return (
    <>
        <div style={{height:'100vh',width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <div style={{display:'flex',width:'25%',flexDirection:'column'}}>
                <div className = "user-type" style={{background: 'url(/images/customer.png) no-repeat', backgroundSize: '100% auto'}}></div>
                <button className="login-button" onClick = {()=>history.push("/customer/login")} >Customer Login</button>
            </div>

            <div style={{display:'flex',width:'25%',flexDirection:'column'}}>
                <div className = "user-type" style={{background: 'url(/images/retailer.png) no-repeat', backgroundSize: '100% auto'}}></div>
                <button className="login-button" onClick = {()=>history.push("/retailer/login")} >Retailer Login</button>
            </div>

            <div style={{display:'flex',width:'25%',flexDirection:'column'}}>
                <div className = "user-type" style={{background: 'url(/images/wholesaler.jpg) no-repeat', backgroundSize: '100% auto'}}></div>
                <button className="login-button" onClick = {()=>history.push("/wholesaler/login")} >Wholesaler Login</button>
            </div>
            
            <div style={{display:'flex',width:'25%',flexDirection:'column'}}>
                <div className = "user-type" style={{background: 'url(/images/delivery.jpg) no-repeat', backgroundSize: '100% auto'}}></div>
                <button className="login-button" onClick = {()=>history.push("/delivery/login")} >Delivery Login</button>
            </div>

            {/* <div className = "user-type" style={{background: 'url(/images/wholesaler.jpg) no-repeat', backgroundSize: '100% auto'}}></div>
            <div className = "user-type" style={{background: 'url(/images/delivery.jpg) no-repeat', backgroundSize: '100% auto'}}></div> */}
        </div>
        {/* <button onClick = {()=>history.push("/retailer/login")} >Retailer Login</button>
        <button onClick = {()=>history.push("/wholesaler/login")} >Wholesaler Login</button>
        <button onClick = {()=>history.push("/delivery/login")} >Delivery Login</button> */}
    </>
    )
}

export default Landing;
