import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Customer from './Customer/Customer'
import Landing from './Landing'
import Retailer from './Retailer/Retailer'
import Wholesaler from './Wholesaler/Wholesaler'
import WholesalerLogin from "./Wholesaler/Login"
import CustomerLogin from './Customer/Login'
import RetailerLogin from './Retailer/Login'


const LandingRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path = "/" component={Landing}></Route>
                <Route exact path = "/customer" component={Customer}></Route>
                <Route exact path = "/retailer" component={Retailer}></Route>
                <Route exact path = "/wholesaler" component={Wholesaler}></Route>
                <Route exact path = "/customer/login" component={CustomerLogin}></Route>
                <Route exact path = "/retailer/login" component={RetailerLogin}></Route>
                <Route exact path = "/wholesaler/login" component={WholesalerLogin}></Route>
            </Switch>
        </Router>
    )
}

export default LandingRoutes
