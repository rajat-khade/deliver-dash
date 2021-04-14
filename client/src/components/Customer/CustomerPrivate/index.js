import React, { useState } from 'react'
import CustomerAuth from '../../../containers/CustomerAuth';
import Dashboard from '../../Dashboard';

const CustomerPrivate = () => {
    const auth = CustomerAuth.useContainer()
    const [cart,setCart] = useState([])
    
    return ( 
        <div>
            Customer logged in
            <button onClick = {()=>auth.logout()}>Log Out</button>
            <Dashboard cart = {cart} setCart = {setCart}/>
        </div>
    )
    
}

export default CustomerPrivate