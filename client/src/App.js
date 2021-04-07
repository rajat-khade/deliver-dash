import { BrowserRouter as Router,Switch} from "react-router-dom";
import CustomerAuth from "./containers/CustomerAuth";
import RetailerAuth from "./containers/RetailerAuth";
import WholesalerAuth from "./containers/WholesalerAuth";
// import Customer from "./components/Customer";
import LandingRoutes from "./components/LandingRoutes";
import CustomerSplash from "./components/Customer";
import RetailerSplash from "./components/Retailer";
import WholesalerSplash from "./components/Wholesaler";

const App = () => {
  return (
    <>
    
        <CustomerAuth.Provider>
            <RetailerAuth.Provider>
                <WholesalerAuth.Provider>
                    <LandingRoutes/>
                </WholesalerAuth.Provider>
            </RetailerAuth.Provider>
        </CustomerAuth.Provider>
    
    </>
  );
};

export default App;
