import React from 'react'
import DeliveryAuth from '../../../containers/DeliveryAuth';
import Dashboard from '../../Dashboard';

const DeliveryPrivate = () => {
    const auth = DeliveryAuth.useContainer();
    
    return ( 
        <div>
            Delivery logged in
            <button onClick = {()=>auth.logout()}>Log Out</button>
            <Dashboard />
        </div>
    )
    
}

export default DeliveryPrivate
