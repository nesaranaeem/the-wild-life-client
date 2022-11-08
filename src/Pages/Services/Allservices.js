import React, { useEffect, useState } from "react";
import ServiceCard from "../../Shared/ServiceCard";
import { Alert } from "@material-tailwind/react";
const Allservices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  });
  return (
    <div className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
      <Alert className="my-4">List Of Services</Alert>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Allservices;
