import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import api from "../api";

const useDeliveryAuth = (initialState = null) => {
  const [deliveryAuth, setDeliveryAuth] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("delivery-auth");
    setDeliveryAuth(JSON.parse(auth));
  }, []);

  const login = (values) => {
    setLoading(true);
    api
      .post("api/delivery/login", values)
      .then((data) => {
        setLoading(false);
        setDeliveryAuth(data.data);
        localStorage.setItem("delivery-auth", JSON.stringify(data.data));
        console.log(data)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.error, "Error");
      });
  };

  const logout = () => {
    setDeliveryAuth(null);
    console.log("Logged out Delivery")
    localStorage.removeItem("delivery-auth");
  };

  return { deliveryAuth, login, logout, isLoading };
};

export default createContainer(useDeliveryAuth);
