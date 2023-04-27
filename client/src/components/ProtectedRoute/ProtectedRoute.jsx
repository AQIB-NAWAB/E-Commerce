import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.User);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <div>Loading...</div>;
        } else if (isAuthenticated === false) {
          navigate("/login");
          return null;
        } else if (isAdmin && user.role !== "admin") {
          navigate("/login");
          return null;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
