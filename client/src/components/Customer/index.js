import CustomerAuth from "../../containers/CustomerAuth";
import CustomerPrivate from "./CustomerPrivate";
import CustomerPublic from "./CustomerPublic";

const CustomerSplash = () => {
  const auth = CustomerAuth.useContainer()
  
  return auth.customerAuth ? <CustomerPrivate /> : <CustomerPublic />;
};

export default CustomerSplash;
