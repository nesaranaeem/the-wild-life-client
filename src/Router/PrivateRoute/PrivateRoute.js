import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  let [color, setColor] = useState("#ffffff");
  if (loading) {
    return (
      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
