import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import api from "../api";

const useAuth = (initialState = null) => {
  const [retailerAuth, setRetailerAuth] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("retailer-auth");
    setRetailerAuth(JSON.parse(auth));
  }, []);

  const login = (values) => {
    setLoading(true);
    api
      .post("api/retailer/login", values)
      .then((data) => {
        setLoading(false);
        setRetailerAuth(data.data);
        localStorage.setItem("retailer-auth", JSON.stringify(data.data));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.error, "Error");
      });
  };

  const logout = () => {
    setRetailerAuth(null);
    localStorage.removeItem("retailer-auth");
  };

  return { retailerAuth, login, logout, isLoading };
};

export default createContainer(useAuth);
