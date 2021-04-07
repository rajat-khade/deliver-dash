import WholesalerAuth from "../../containers/WholesalerAuth";
import WholesalerPrivate from "./WholesalerPrivate";
import WholesalerPublic from "./WholesalerPublic";

const WholesalerSplash = () => {
  const auth = WholesalerAuth.useContainer()
  
  return auth.wholesalerAuth ? <WholesalerPrivate /> : <WholesalerPublic />;
};

export default WholesalerSplash;
