import React from 'react'
import { Route, Switch } from 'react-router'
import RetailerAuth from '../../../containers/RetailerAuth'
import Login from '../../Login'

const RetailerPublic = () => {
    const auth = RetailerAuth.useContainer()

    const customerLoggedIn = localStorage.getItem("customer-auth")
    const wholesalerLoggedIn = localStorage.getItem("wholesaler-auth")

    if(customerLoggedIn || wholesalerLoggedIn)
        return <h1>Not Authorized</h1>

    return (
        <Switch>
            <Route exact path = "/retailer*" component = {()=><Login auth = {auth} type = "retailer"/>}/>
        </Switch>
    )
}

export default RetailerPublic
