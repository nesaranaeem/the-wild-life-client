import React, { Fragment, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  Textarea,
} from "@material-tailwind/react";

const MyReviewCard = ({ review, handleDelete }) => {
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
        },
        body: JSON.stringify({ description: description }),
      })
        .then((res) => res.json())
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
          <Typography variant="h5" className="mb-2">
            {review.title}
          </Typography>
          {/* <button onClick={() => handleUpdate(review._id)}>dd</button> */}
          <Typography>
            {review.description}

            <Button onClick={handleOpen} variant="gradient" size="sm">
              Edit
            </Button>
          </Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
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
          <form className="p-8" onSubmit={handleUpdate}>
            <Textarea
              name="description"
              defaultValue={review.description}
              label="description"
            />
            <input
              type="submit"
              className="block w-full rounded-lg bg-indigo-400 hover:bg-indigo-800 px-5 py-3 text-sm font-medium text-white"
              value="Update"
            ></input>
          </form>
        </Dialog>
      </Fragment>
    </>
  );
};

export default MyReviewCard;
