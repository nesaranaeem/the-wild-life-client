import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaFontAwesomeFlag, FaFileImage } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import MyReviewCard from "./MyReviewCard";
const MyReviews = () => {
  const { user, logOut } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/reviewby?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("the-wildlife-token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then((data) => setReviews(data));
  }, [user?.email, logOut, reviews]);

  const [reviewDelete, setReview] = useState([]);
  const handleDelete = (id) => {
    const proceed = window.confirm(`are you sure you want to remove?`);
    if (proceed) {
      fetch(`http://localhost:5000/reviewby/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount === 1) {
            toast(` Your review is deleted from the list`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            const remaining = reviewDelete.filter((odr) => odr._id !== id);
            setReview(remaining);
          }
        });
    }
  };

  const handleEdit = (id) => {
    fetch(`http://localhost:5000/reviewby/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          const remaining = reviews.filter((odr) => odr._id !== id);
          const approving = reviews.find((odr) => odr._id === id);
          approving.status = "Approved";
          const newOrders = [approving, ...remaining];
          setReview(newOrders);
        }
      });
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
        <p className="text-center font-medium py-5">
          {reviews?.length === 0 ? (
            <p>No reviews were added</p>
          ) : (
            <p>Total Review: {reviews.length}</p>
          )}
        </p>
        <CardFooter className="pt-0">
          <div className="pt-4"></div>
        </CardFooter>
      </Card>
      <div className="my-8 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3">
        {reviews.map((review) => (
          <MyReviewCard
            key={review._id}
            handleDelete={handleDelete}
            review={review}
            handleEdit={handleEdit}
          ></MyReviewCard>
        ))}
      </div>
    </section>
  );
};

export default MyReviews;
