import React from 'react'
import RetailerAuth from '../../../containers/RetailerAuth';
import Dashboard from '../../Dashboard';

const RetailerPrivate = () => {
    const auth = RetailerAuth.useContainer();
    
    return ( 
        <div>
            {/* Retailer logged in */}
            {/* <button onClick = {()=>auth.logout()}>Log Out</button> */}
            <Dashboard />
        </div>
    )
    
}

export default RetailerPrivate
