import React from 'react'
import {useHistory} from 'react-router-dom'
import WholesalerAuth from '../../containers/WholesalerAuth';

const Wholesaler = () => {
    const wholesalerAuth = WholesalerAuth.useContainer();
    let history = useHistory()

    if(wholesalerAuth.wholesalerAuth){
        return ( 
            <div>
                Wholesaler logged in
            </div>
        )
    }

    history.push("/wholesaler/login")
    return <div></div>
}

export default Wholesaler
