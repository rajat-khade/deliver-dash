import React from 'react'
import RetailerAuth from '../../../containers/RetailerAuth';

const RetailerPrivate = () => {
    const auth = RetailerAuth.useContainer();
    
    return ( 
        <div>
            Retailer logged in
            <button onClick = {()=>auth.logout()}>Log Out</button>
        </div>
    )
    
}

export default RetailerPrivate
