import React from 'react'
import WholesalerAuth from '../../../containers/WholesalerAuth';

const WholesalerPrivate = () => {
    const auth = WholesalerAuth.useContainer();
    
    return ( 
        <div>
            Wholesaler logged in
            <button onClick = {()=>auth.logout()}>Log Out</button>
        </div>
    )
    
}

export default WholesalerPrivate
