import React from 'react'
import {useHistory} from 'react-router-dom'
import RetailerAuth from '../../containers/RetailerAuth';

const Retailer = () => {
    const retailerAuth = RetailerAuth.useContainer();
    let history = useHistory()
    if(retailerAuth.retailerAuth){
        return ( 
            <div>
                Retailer logged in
            </div>
        )
    }

    history.push("/retailer/login")
    return <div></div>
}

export default Retailer
