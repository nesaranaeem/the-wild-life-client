import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { Helmet } from "react-helmet";
import { FaFontAwesomeFlag, FaFileImage, FaDollarSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import SubmittedServices from "./SubmittedServices";
const AddService = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleAddService = (event) => {
    event.preventDefault();
    const form = event.target;
    const addedBy = `${user?.displayName}`;
    const adderemail = user?.email || "Guest";
    const serviceName = form.serviceName.value;
    const photo = form.photo.value;
    const startingPrice = form.startingPrice.value;
    const otherCharge = form.otherCharge.value;
    const description = form.description.value;
    if (
      serviceName === "" ||
      photo === "" ||
      startingPrice === "" ||
      otherCharge === "" ||
      description === ""
    ) {
      alert("All Fields are required");
      return;
    }
    const service = {
      serviceName: serviceName,
      photo: photo,
      startingPrice: startingPrice,
      otherCharge: otherCharge,
      description: description,
      addedBy: addedBy,
      email: adderemail,
    };
    fetch(
      "https://the-wildlife-professional-photographer-server.vercel.app/services",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(service),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          toast("YAY! Service Added!!!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => console.error(err));
  };
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch(
      `https://the-wildlife-professional-photographer-server.vercel.app/serviceby?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("the-wildlife-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setServices(data));
  }, [user?.email, logOut, services]);

  return (
    <div className="mx-auto my-4 max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Service - The Wild Life</title>
        <meta name="description" content="Add Service page - The Wild Life" />
      </Helmet>
      <Card className="w-full">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Add Service
          </Typography>
        </CardHeader>
        <h3 className="text-center text-xl">
          Hello, <span className="font-bold">{user?.displayName}</span>(
          {user?.email}). Please add service
        </h3>
        <form onSubmit={handleAddService}>
          <CardBody className="grid justify-items-center gap-4 md:grid-cols-2">
            <Input
              label="Service Name"
              name="serviceName"
              size="lg"
              icon={<FaFontAwesomeFlag />}
            />
            <Input
              label="Photo URL"
              name="photo"
              size="lg"
              icon={<FaFileImage />}
            />
            <Input
              label="Starting Price $"
              type="number"
              name="startingPrice"
              size="lg"
              icon={<FaDollarSign />}
            />
            <Input
              label="Other Charge $"
              type="number"
              name="otherCharge"
              size="lg"
              icon={<FaDollarSign />}
            />

            <div className="lg:col-span-2 w-full">
              <Textarea name="description" label="Description" />
            </div>
            <div className="lg:col-span-2">
              <input
                type="submit"
                className="block rounded-lg bg-indigo-400 hover:bg-indigo-800 px-5 py-3 text-sm font-medium text-white"
                value="Add Service"
              ></input>
            </div>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <div className="pt-4"></div>
        </CardFooter>
      </Card>

      <div class="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 my-4">
        <h3 className="text-center my-2">
          {user?.displayName}, You added {services.length} Services yet
        </h3>
        {services?.length < 1 ? (
          <p className="text-center">No data</p>
        ) : (
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="bg-gray-100 px-4 py-2 text-left">
                  <label class="sr-only" for="SelectAll">
                    Select All
                  </label>
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Service Name
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Photo URL
                </th>

                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Details
                </th>
                <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Starting
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              {services.map((service) => (
                <SubmittedServices
                  key={service._id}
                  service={service}
                ></SubmittedServices>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddService;
