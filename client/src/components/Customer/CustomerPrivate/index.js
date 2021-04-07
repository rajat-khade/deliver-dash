import React from 'react'
import CustomerAuth from '../../../containers/CustomerAuth';

const CustomerPrivate = () => {
    const auth = CustomerAuth.useContainer()
    
    return ( 
        <div>
            Customer logged in
            <button onClick = {()=>auth.logout()}>Log Out</button>
        </div>
    )
    
}

export default CustomerPrivate