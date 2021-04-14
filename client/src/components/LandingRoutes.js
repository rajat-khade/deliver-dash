import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import CustomerAuth from '../containers/CustomerAuth'
import RetailerAuth from '../containers/RetailerAuth'
import WholesalerAuth from '../containers/WholesalerAuth'
import CartSplash from './Cart'
import Customer from './Customer'
import Landing from './Landing'
import Retailer from './Retailer'
import Wholesaler from './Wholesaler'


const LandingRoutes = () => {

    // const customerAuth = localStorage.getItem("customer-auth")
    // const retailerAuth = localStorage.getItem("retailer-auth")
    // const wholesalerAuth = localStorage.getItem("wholesaler-auth")

    // if(customerAuth || retailerAuth || wholesalerAuth)
    //     return <div></div>

    return (
        <Router>
            <Switch>
                <Route exact path = "/" component={Landing}></Route>
                <Route exact path = "/customer/cart" component={CartSplash}></Route>
                <Route exact path = "/customer/*" component={Customer}></Route>
                <Route exact path = "/retailer/*" component={Retailer}></Route>
                <Route exact path = "/wholesaler/*" component={Wholesaler}></Route>
            </Switch>
        </Router>
    )
}

export default LandingRoutes
