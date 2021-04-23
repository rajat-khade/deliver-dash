import React from 'react'
import { useHistory } from 'react-router';
import WholesalerAuth from '../../../containers/WholesalerAuth';
import Dashboard from '../../Dashboard';

const WholesalerPrivate = () => {
    const auth = WholesalerAuth.useContainer();
    const history = useHistory()
    return ( 
        <div>
            {history.push("/wholesaler/stock")}
        </div>
    )
    
}

export default WholesalerPrivate
