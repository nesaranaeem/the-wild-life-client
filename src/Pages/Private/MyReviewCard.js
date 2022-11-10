import React, { Fragment, useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Textarea,
  DialogFooter,
} from "@material-tailwind/react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const MyReviewCard = ({ review, handleDelete }) => {
  const { user, logOut } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const description = form.description.value;
    const abcd = (12).then(
      fetch(`http://localhost:5000/updatereview/${review._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("the-wildlife-token")}`,
        },
        body: JSON.stringify({ description: description, title: "bal" }),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            return logOut();
          }
          return res.json();
        })
        .then((data) => {
          if (data.modifiedCount) {
            const remaining = reviews.filter((odr) => odr._id !== review._id);
            const approving = reviews.find((odr) => odr._id === review._id);
            approving.description = description;
            const newDescription = [approving, ...remaining];
            setReviews(newDescription);
          }
        })
    );
  };
  return (
    <>
      <Card className="w-full lg:w-96">
        <CardHeader
          color="blue"
          className="relative h-56 flex items-center justify-center"
        >
          <h2 className="text-xl">On: {review.service}</h2>
        </CardHeader>
        <CardBody className="text-center">
          <Typography>{review.description}</Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Button onClick={handleOpen} variant="gradient" size="sm">
            Edit
          </Button>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            <Button size="sm" onClick={() => handleDelete(review._id)}>
              Delete
            </Button>
          </Typography>
        </CardFooter>
      </Card>

      {/* popup */}
      <Fragment>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Update</DialogHeader>
          <form className="w-auto h-auto" onSubmit={handleUpdate}>
            <DialogBody divider>
              <Textarea
                name="description"
                defaultValue={review.description}
                label="description"
              />
            </DialogBody>
            <DialogFooter>
              <input
                onClick={handleOpen}
                type="submit"
                className="block w-24 rounded-lg bg-indigo-400 hover:bg-indigo-800 px-5 py-3 text-sm font-medium text-white"
                value="Update"
              ></input>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Fragment>
    </>
  );
};

export default MyReviewCard;
