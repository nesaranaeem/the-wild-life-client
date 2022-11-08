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
  DialogBody,
  DialogFooter,
  Textarea,
} from "@material-tailwind/react";

const MyReviewCard = ({ review, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
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
          <Typography>{review.description}</Typography>
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">
            <Button onClick={handleOpen} variant="gradient" size="sm">
              Edit
            </Button>
            <Dialog open={open} handler={handleOpen}>
              <DialogHeader>Edit Review</DialogHeader>
              <DialogBody divider>
                <Textarea>{review.title}</Textarea>
              </DialogBody>
              <DialogBody divider>
                <Textarea>{review.description}</Textarea>
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleOpen}>
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            <Button size="sm" onClick={() => handleDelete(review._id)}>
              Delete
            </Button>
          </Typography>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export default MyReviewCard;
