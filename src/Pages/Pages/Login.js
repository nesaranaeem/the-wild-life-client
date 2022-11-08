import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { FaGoogle, FaMailBulk, FaLockOpen } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
const Login = () => {
  const { loginUserEmailPassword, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log("object");
    loginUserEmailPassword(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user.email);
        toast("Login Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);
        //get jwt tokens
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //set on local storage
            localStorage.setItem("the-wildlife-token", data.token);
          });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err.message);
        toast.error(err.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const provider = new GoogleAuthProvider();
  const handelGoogleLogin = () => {
    googleLogin(provider)
      .then((result) => {
        const user = result.user;
        toast("Login Success", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const currentUser = {
          email: user.email,
        };
        //get jwt tokens
        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            //set on local storage
            localStorage.setItem("the-wildlife-token", data.token);
          });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Login Error", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <div className="grid justify-items-center gap-10 my-20 md:grid-cols-1">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login - The Wild Life</title>
        <meta name="description" content="Login page - The Wild Life" />
      </Helmet>
      <Card className="w-full lg:w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Log In
          </Typography>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" name="email" size="lg" icon={<FaMailBulk />} />
            <Input
              label="Password"
              name="password"
              type="password"
              size="lg"
              icon={<FaLockOpen />}
            />

            <Button className="mt-2" variant="gradient" fullWidth>
              <input type="submit" className="btn btn-primary" value="Login" />
            </Button>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <div className="pt-4">
            <Button color="blue" fullWidth>
              <div
                className="flex items-center justify-center"
                onClick={handelGoogleLogin}
              >
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
