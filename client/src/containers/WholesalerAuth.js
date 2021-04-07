import { useEffect, useState } from "react";
import { createContainer } from "unstated-next";
import api from "../api";

const useAuth = (initialState = null) => {
  const [wholesalerAuth, setWholesalerAuth] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("wholesaler-auth");
    setWholesalerAuth(JSON.parse(auth));
  }, []);

  const login = (values) => {
    setLoading(true);
    api
      .post("api/wholesaler/login", values)
      .then((data) => {
        setLoading(false);
        setWholesalerAuth(data.data);
        localStorage.setItem("wholesaler-auth", JSON.stringify(data.data));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.error, "Error");
      });
  };

  const logout = () => {
    setWholesalerAuth(null);
    localStorage.removeItem("wholesaler-auth");
  };

  return { wholesalerAuth, login, logout, isLoading };
};

export default createContainer(useAuth);
