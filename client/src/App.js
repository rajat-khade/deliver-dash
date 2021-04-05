import { BrowserRouter as Router,Switch} from "react-router-dom";
import CustomerAuth from "./containers/CustomerAuth";
import RetailerAuth from "./containers/RetailerAuth";
import WholesalerAuth from "./containers/WholesalerAuth";
// import Customer from "./components/Customer";
import Retailer from "./components/Retailer/Retailer";
import Wholesaler from "./components/Wholesaler/Wholesaler";
import LandingRoutes from "./components/LandingRoutes";
import Customer from "./components/Customer/Customer";

const App = () => {
  return (
    <>
    <Router>
        <Switch>
            <Router>
                <LandingRoutes />
            </Router>
            <CustomerAuth.Provider>
                <Router>
                    <Customer />
                </Router>
            </CustomerAuth.Provider>
            <RetailerAuth.Provider>
                <Router>
                <Retailer />
                </Router>
            </RetailerAuth.Provider>
            <WholesalerAuth.Provider>
                <Router>
                <Wholesaler />
                </Router>
            </WholesalerAuth.Provider>
        </Switch>
    </Router>
      
    
    </>
  );
};

export default App;
