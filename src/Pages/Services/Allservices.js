import React, { useContext, useEffect, useState } from "react";
import ServiceCard from "../../Shared/ServiceCard";
import { Alert } from "@material-tailwind/react";
import { Helmet } from "react-helmet";
import Loader from "../../Shared/Loader/Loader";
const Allservices = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch(
      "https://the-wildlife-professional-photographer-server.vercel.app/all-services"
    )
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  });

  return (
    <div className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Services - Professional Wild Life Photographer</title>
        <meta
          name="description"
          content="Explore all services - The Wild Life"
        />
      </Helmet>
      <Alert className="my-4 text-center">List Of Services</Alert>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <Loader></Loader>
        ) : (
          services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Allservices;
