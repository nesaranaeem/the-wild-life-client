import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Card, CardBody, CardFooter, Textarea } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReviewCard from "./Review/ReviewCard";
import { Helmet } from "react-helmet";
import Loader from "../../Shared/Loader/Loader";
const Services = () => {
  const { _id, serviceName, photo, startingPrice, description, otherCharge } =
    useLoaderData();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const handleAddReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const addedBy = `${user?.displayName}`;
    const adderemail = user?.email || "Guest";

    const description = form.description.value;
    form.reset();
    if (description === "") {
      alert("Please fill up all fields");
      return;
    }

    const review = {
      serviceId: _id,
      service: serviceName,

      description: description,
      addedBy: addedBy,
      profileImage: user?.photoURL,
      email: adderemail,
    };
    //post review
    fetch(
      "https://the-wildlife-professional-photographer-server.vercel.app/reviews",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(review),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.acknowledged) {
          toast("YAY! Review Added!!!", {
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
  const [review, setReview] = useState([]);
  fetch(
    `https://the-wildlife-professional-photographer-server.vercel.app/reviews/${_id}`
  )
    .then((res) => res.json())
    .then(
      (data) => {
        setReview(data);
        setLoading(false);
      },
      [review]
    );
  return (
    <div className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{serviceName} - The Wild Life</title>
        <meta
          name="description"
          content="The Wild Life is a professional wild life photographer"
        />
      </Helmet>
      <div className="group relative flex h-96 w-full items-end bg-black">
        <PhotoProvider>
          <PhotoView src={photo}>
            <img
              src={photo}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-opacity group-hover:opacity-90"
            />
          </PhotoView>
        </PhotoProvider>

        <div className="mx-auto relative w-full bg-red-700 p-6 text-center tracking-widest text-white transition-colors group-hover:bg-black sm:w-2/3">
          <h3 className="text-lg uppercase">{serviceName}</h3>

          <p className="mt-1 text-xs font-medium uppercase">
            Starting at $ {startingPrice}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="mt-4 sm:mt-8">
          <div className="inline-flex items-center rounded-full bg-indigo-700 px-8 py-3 text-white shadow-lg transition hover:bg-indigo-600 focus:outline-none focus:ring">
            <span className="text-sm font-medium">
              {" "}
              Others Charge: ${otherCharge}
            </span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="text-lg">{description}</p>
      </div>
      <div>
        {user?.uid ? (
          <Card className="w-full">
            <h3 className="text-center text-xl">
              Hello, <span className="font-bold">{user?.displayName}</span>(
              {user?.email}). Add your review
            </h3>
            <form onSubmit={handleAddReview}>
              <CardBody className="grid justify-items-center gap-4 md:grid-cols-2">
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
        ) : (
          <div className="flex items-center justify-center">
            <div className="bg-indigo-600 px-4 py-3 text-white">
              <p className="text-center text-sm font-medium">
                You are not logged in. Please
                <Link to="/login" className="underline">
                  {" "}
                  Login &rarr;{" "}
                </Link>{" "}
                to add comments
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-center">
          <div className="bg-indigo-600 px-4 py-3 mt-5 text-white">
            <p className="text-center text-sm font-medium">
              Total {review.length} Reviews Found! &rarr;{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
        {loading ? (
          <Loader></Loader>
        ) : (
          review.map((getReview) => (
            <ReviewCard key={getReview._id} getReview={getReview}></ReviewCard>
          ))
        )}
      </div>
    </div>
  );
};

export default Services;
