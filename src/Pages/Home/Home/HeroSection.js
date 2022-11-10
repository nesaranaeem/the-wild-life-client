import React, { useContext, useEffect, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import Heroitems from "./HeroItems/Heroitems";

const HeroSection = () => {
  //for service
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  });

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Heroitems services={services}></Heroitems>
      )}
    </>
  );
};

export default HeroSection;
