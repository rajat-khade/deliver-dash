import RetailerAuth from "../../containers/RetailerAuth";
import RetailerPrivate from "./RetailerPrivate";
import RetailerPublic from "./RetailerPublic";

const RetailerSplash = () => {
  const auth = RetailerAuth.useContainer()
  
  return auth.retailerAuth ? <RetailerPrivate /> : <RetailerPublic />;
};

export default RetailerSplash;
