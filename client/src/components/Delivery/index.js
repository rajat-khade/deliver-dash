import DeliveryAuth from "../../containers/DeliveryAuth";
import DeliveryPrivate from "./DeliveryPrivate";
import DeliveryPublic from "./DeliveryPublic";

const DeliverySplash = () => {
  const auth = DeliveryAuth.useContainer()
  
  return auth.deliveryAuth ? <DeliveryPrivate /> : <DeliveryPublic />;
};

export default DeliverySplash;
