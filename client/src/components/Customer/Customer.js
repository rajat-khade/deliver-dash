import React from 'react'
import {useHistory} from 'react-router-dom'
import CustomerAuth from '../../containers/CustomerAuth';
import Login from './Login';

const Customer = () => {
    const customerAuth = CustomerAuth.useContainer();
    let history = useHistory()

    // console.log("sdf")
    if(customerAuth.customerAuth){
        return ( 
            <div>
                Customer logged in
            </div>
        )
    }

    // return <CustomerLogin/>
    // history.push("/customer/login")
    // return <div></div>
    return <Login/>
}

export default Customer