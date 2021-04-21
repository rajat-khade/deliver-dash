import React, { useState } from 'react'
import CustomerAuth from '../../../containers/CustomerAuth';
import Dashboard from '../../Dashboard';

const CustomerPrivate = () => {
    const auth = CustomerAuth.useContainer()
    
    return ( 
        <div>
            {/* <button onClick = {()=>auth.logout()}>Log Out</button> */}
            <Dashboard/>
        </div>
    )
    
}

export default CustomerPrivate