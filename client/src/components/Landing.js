import React from 'react'
import {useHistory} from "react-router-dom"

const Landing = () => {
    let history = useHistory()
    return (
        <div>
            <button onClick = {()=>history.push("/customer/login")} >Customer Login</button>
            <button onClick = {()=>history.push("/retailer/login")} >Retailer Login</button>
            <button onClick = {()=>history.push("/wholesaler/login")} >Wholesaler Login</button>
        </div>
    )
}

export default Landing
