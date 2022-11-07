import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FaGoogle, FaMailBulk, FaLockOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="grid justify-items-center gap-10 my-20 md:grid-cols-1">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" icon={<FaMailBulk />} />
          <Input label="Password" size="lg" icon={<FaLockOpen />} />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Log In
          </Button>
          <div className="pt-4">
            <Button color="blue" fullWidth>
              <div className="flex items-center justify-center">
                <FaGoogle className="mr-2" />
                Login with Google
              </div>
            </Button>
          </div>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Link to="/signup">
              <Typography
                as="a"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
