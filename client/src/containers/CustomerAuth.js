import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import api from "../api";

const useCustomerAuth = (initialState = null) => {
  const [customerAuth, setCustomerAuth] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("customer-auth");
    setCustomerAuth(JSON.parse(auth));
  }, []);

  const login = (values) => {
    setLoading(true);
    api
      .post("api/customer/login", values)
      .then((data) => {
        setLoading(false);
        setCustomerAuth(data.data);
        localStorage.setItem("customer-auth", JSON.stringify(data.data));
        console.log(data)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.error, "Error");
      });
  };

  const logout = () => {
    setCustomerAuth(null);
    console.log("Logged out Customer")
    localStorage.removeItem("customer-auth");
  };

  return { customerAuth, login, logout, isLoading };
};

export default createContainer(useCustomerAuth);
