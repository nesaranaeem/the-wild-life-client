import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Blog from "../../Pages/Blog/Blog";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Pages/Login";
import SignUp from "../../Pages/Pages/SignUp";
import AddService from "../../Pages/Private/AddService";
import MyReviews from "../../Pages/Private/MyReviews";
import Allservices from "../../Pages/Services/Allservices";
import Services from "../../Pages/Services/Services";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/services/:id",
        element: <Services></Services>,
        loader: ({ params }) =>
          fetch(
            `https://the-wildlife-professional-photographer-server.vercel.app/services/${params.id}`
          ),
        errorElement: <ErrorPage></ErrorPage>,
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },

      {
        path: "/services",
        element: <Allservices></Allservices>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);
