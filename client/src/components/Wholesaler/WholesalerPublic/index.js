import React from 'react'
import { Route, Switch } from 'react-router'
import WholesalerAuth from '../../../containers/WholesalerAuth'
import Login from '../../Login'

const WholesalerPublic = () => {
    const auth = WholesalerAuth.useContainer()

    const customerLoggedIn = localStorage.getItem("customer-auth")
    const retailerLoggedIn = localStorage.getItem("retailer-auth")
    const deliveryLoggedIn = localStorage.getItem("delivery-auth")
    
    if(customerLoggedIn || retailerLoggedIn || deliveryLoggedIn)
        return <h1>Not Authorized</h1>

    return (
        <Switch>
            <Route exact path = "/wholesaler*" component = {()=><Login auth = {auth} type = "wholesaler"/>}/>
        </Switch>
    )
}

export default WholesalerPublic
