import { React, useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider/AuthProvider";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./Style.css";
const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openNav, setOpenNav] = useState(false);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => {});
  };
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        {/* <div className="p-0">
          <div className="dropdown inline-block relative">
            <button className=" text-gray-700 font-semibold rounded inline-flex items-center">
              <span>Services</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li className="">
                <Link to="sds">djsj</Link>
              </li>
            </ul>
          </div>
        </div> */}
      </Typography>
      <Link to="/blog">
        <Button size="sm" className="ml-3 w-32 h-8">
          Blog
        </Button>
      </Link>
      <Link to="/services">
        <Button size="sm" className="ml-3 w-32 h-8">
          All Services
        </Button>
      </Link>
    </ul>
  );
  return (
    <Navbar className="mx-auto max-w-screen-xl my-2 py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            variant="small"
            className="mr-4 cursor-pointer py-1.5 font-normal"
          >
            <span className="text-xl">The Wild Life</span>
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        {user?.uid ? (
          <div className="hidden lg:flex items-center justify-center">
            <Tooltip content={`${user.displayName}`}>
              <Avatar src={user?.photoURL} alt="avatar" variant="circular" />
            </Tooltip>
            <div className="hidden lg:flex items-center justify-center">
              <Link to="/my-reviews">
                <Button size="sm" className="ml-3 w-28 h-8">
                  My Reviews
                </Button>
              </Link>
              <Link to="/add-service">
                <Button size="sm" className="ml-3 w-32 h-8">
                  Add Service
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={handleLogOut}
                className="ml-3 w-24 h-8"
              >
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center justify-center">
            <Link to="/login">
              <Button variant="gradient" className="mr-3">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="gradient">Sign Up</Button>
            </Link>
          </div>
        )}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        {user?.uid ? (
          <div className="flex flex-col items-center justify-center">
            <Tooltip content={`${user.displayName}`}>
              <Avatar src={user?.photoURL} alt="avatar" variant="circular" />
            </Tooltip>

            <Link to="/my-reviews">
              <Button size="sm" className="mt-1 w-28 h-8">
                My Reviews
              </Button>
            </Link>
            <Link to="/add-service">
              <Button size="sm" className="mt-1 w-32 h-8">
                Add Service
              </Button>
            </Link>
            <Button size="sm" onClick={handleLogOut} className="mt-1 w-24 h-8">
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Link to="/login">
              <Button variant="gradient" className="mr-3">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="gradient">Sign Up</Button>
            </Link>
          </div>
        )}
      </MobileNav>
    </Navbar>
  );
};

export default Header;
