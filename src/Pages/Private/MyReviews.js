import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { FaFontAwesomeFlag, FaFileImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
const MyReviews = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleAddReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const addedBy = `${user?.displayName}`;
    const adderemail = user?.email || "Guest";
    const title = form.title.value;
    const rating = form.rating.value;

    const description = form.description.value;
    const service = {
      title: title,
      rating: rating,
      description: description,
      addedBy: addedBy,
      email: adderemail,
    };
    console.log(service);
  };
  return (
    <section className="mx-auto my-4 max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Reviews - The Wild Life</title>
        <meta name="description" content="My Reviews page - The Wild Life" />
      </Helmet>
      <Card className="w-full">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Reviews
          </Typography>
        </CardHeader>
        <h3 className="text-center text-xl">
          Hello, <span className="font-bold">{user?.displayName}</span>(
          {user?.email}).
        </h3>
        <form onSubmit={handleAddReview}>
          <CardBody className="grid justify-items-center gap-4 md:grid-cols-2">
            <Input
              label="Review Title"
              name="title"
              size="lg"
              icon={<FaFontAwesomeFlag />}
            />
            <select
              name="rating"
              className="w-full border-solid border border-gray-400"
            >
              <option disabled selected>
                Rate Out of 5
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <div className="lg:col-span-2 w-full">
              <Textarea name="description" label="Description" />
            </div>
            <div className="lg:col-span-2">
              <input
                type="submit"
                className="block rounded-lg bg-indigo-400 hover:bg-indigo-800 px-5 py-3 text-sm font-medium text-white"
                value="Add Review"
              ></input>
            </div>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <div className="pt-4"></div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default MyReviews;
