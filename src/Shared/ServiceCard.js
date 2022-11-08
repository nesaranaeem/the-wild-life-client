import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
const ServiceCard = ({ service }) => {
  return (
    <Card className="w-full">
      <CardHeader color="blue" className="relative h-56">
        <img
          src={service.photo}
          alt={service.serviceName}
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {service.serviceName}
        </Typography>
        <Typography>{service.description.slice(0, 90)}...</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">
          Starts $ {service.startingPrice}
        </Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          <Link to={`/services/${service._id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
