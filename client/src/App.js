import CustomerAuth from "./containers/CustomerAuth";
import RetailerAuth from "./containers/RetailerAuth";
import WholesalerAuth from "./containers/WholesalerAuth";
import DeliveryAuth from "./containers/DeliveryAuth";
import LandingRoutes from "./components/LandingRoutes";

const App = () => {


    return ( 
    <>
        <CustomerAuth.Provider >
            <RetailerAuth.Provider >
                <WholesalerAuth.Provider>
                    <DeliveryAuth.Provider>
                        <LandingRoutes/>
                    </DeliveryAuth.Provider>
                </WholesalerAuth.Provider> 
            </RetailerAuth.Provider> 
        </CustomerAuth.Provider>
    </>
    );
};

export default App;