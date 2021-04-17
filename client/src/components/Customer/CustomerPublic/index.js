import React from 'react'
import { Route, Switch } from 'react-router'
import CustomerAuth from '../../../containers/CustomerAuth'
import Login from '../../Login'

const CustomerPublic = () => {
    const auth = CustomerAuth.useContainer()

    const retailerLoggedIn = localStorage.getItem("retailer-auth")
    const wholesalerLoggedIn = localStorage.getItem("wholesaler-auth")
    const deliveryLoggedIn = localStorage.getItem("delivery-auth")

    if(retailerLoggedIn || wholesalerLoggedIn || deliveryLoggedIn)
        return <h1>Not Authorized</h1>

    return (
        <Switch>
            <Route exact path = "/customer*" component = {()=><Login auth = {auth} type = "customer"/>}/>
        </Switch>
    )
}

export default CustomerPublic
