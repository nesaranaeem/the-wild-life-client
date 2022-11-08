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
import {
  FaGoogle,
  FaUserCheck,
  FaFileImage,
  FaMailBulk,
  FaLock,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
import { Helmet } from "react-helmet";
const SignUp = () => {
  const { createUser, updateName, googleLogin, setUser } =
    useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();

        // Update Name
        updateName(name, photoURL).then(() => {
          setUser({ ...user, displayName: name, photoURL });
        });

        toast("Signup Success", {
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
        // fetch("http://localhost:5000/jwt", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   body: JSON.stringify(currentUser),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //     //set on local storage
        //     localStorage.setItem("the-wildlife-token", data.token);
        //   });
        navigate(from, { replace: true });
      })
      .catch((err) => {
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
        toast("Signup Success", {
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
        // get jwt tokens
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
        toast.error("error", {
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
        <title>Sign Up - The Wild Life</title>
        <meta name="description" content="Sign Up page - The Wild Life" />
      </Helmet>
      <Card className="w-full lg:w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardBody className="flex flex-col gap-4">
            <Input label="Name" name="name" size="lg" icon={<FaUserCheck />} />
            <Input
              label="Photo URL"
              name="photo"
              size="lg"
              icon={<FaFileImage />}
            />
            <Input label="Email" name="email" size="lg" icon={<FaMailBulk />} />

            <Input
              label="Password"
              type="password"
              name="password"
              size="lg"
              icon={<FaLock />}
            />
            <input
              type="submit"
              className="block w-full rounded-lg bg-indigo-400 hover:bg-indigo-800 px-5 py-3 text-sm font-medium text-white"
              value="Sign Up"
            ></input>
          </CardBody>
        </form>
        <CardFooter className="pt-0">
          <div className="pt-4">
            <Button color="blue" fullWidth onClick={handelGoogleLogin}>
              <div className="flex items-center justify-center">
                <FaGoogle className="mr-2" />
                Signup with Google
              </div>
            </Button>
          </div>
          <Typography variant="small" className="mt-6 flex justify-center">
            Already have an account?
            <Link to="/login">
              <Typography
                as="a"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Login
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
