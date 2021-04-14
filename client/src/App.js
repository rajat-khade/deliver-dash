import CustomerAuth from "./containers/CustomerAuth";
import RetailerAuth from "./containers/RetailerAuth";
import WholesalerAuth from "./containers/WholesalerAuth";
// import Customer from "./components/Customer";
import LandingRoutes from "./components/LandingRoutes";

const App = () => {
    return ( 
    <>
        <CustomerAuth.Provider >
            <RetailerAuth.Provider >
                <WholesalerAuth.Provider>
                    <LandingRoutes/>
                </WholesalerAuth.Provider> 
            </RetailerAuth.Provider> 
        </CustomerAuth.Provider>
    </>
    );
};

export default App;