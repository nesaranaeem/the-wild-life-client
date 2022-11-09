import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import Loader from "../../../Shared/Loader/Loader";
import Heroitems from "./HeroItems/Heroitems";

const HeroSection = () => {
  const [services, setServices] = useState([]);
  const { loading, setLoading } = useContext(AuthContext);
  useEffect(() => {
    setLoading();
    fetch(
      "https://the-wildlife-professional-photographer-server.vercel.app/services"
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, [setLoading]);
  if (loading) {
    return <Loader></Loader>;
  }
  return <Heroitems services={services}></Heroitems>;
};

export default HeroSection;
