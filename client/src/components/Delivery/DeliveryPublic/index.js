import React from 'react'
import { Route, Switch } from 'react-router'
import DeliveryAuth from '../../../containers/DeliveryAuth'
import Login from '../../Login'

const DeliveryPublic = () => {
    const auth = DeliveryAuth.useContainer()

    
    const customerLoggedIn = localStorage.getItem("customer-auth")
    const retailerLoggedIn = localStorage.getItem("retailer-auth")
    const wholesalerLoggedIn = localStorage.getItem("wholesaler-auth")

    if(customerLoggedIn || retailerLoggedIn || wholesalerLoggedIn)
        return <h1>Not Authorized</h1>

    return (
        <Switch>
            <Route exact path = "/delivery*" component = {()=><Login auth = {auth} type = "delivery"/>}/>
        </Switch>
    )
}

export default DeliveryPublic
