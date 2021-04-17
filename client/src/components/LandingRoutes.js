import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
// import CustomerAuth from '../containers/CustomerAuth'
// import RetailerAuth from '../containers/RetailerAuth'
// import WholesalerAuth from '../containers/WholesalerAuth'
import Landing from './Landing'
import CartSplash from './Cart'
import Stock from './Stock'

import Customer from './Customer'
import Retailer from './Retailer'
import Wholesaler from './Wholesaler'
import Delivery from './Delivery'


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
                <Route exact path = "/*/cart" component={CartSplash}></Route>
                <Route exact path = "/*/stock" component={Stock}></Route>
                <Route exact path = "/customer/*" component={Customer}></Route>
                <Route exact path = "/retailer/*" component={Retailer}></Route>
                <Route exact path = "/wholesaler/*" component={Wholesaler}></Route>
                <Route exact path = "/delivery/*" component={Delivery}></Route>
            </Switch>
        </Router>
    )
}

export default LandingRoutes
