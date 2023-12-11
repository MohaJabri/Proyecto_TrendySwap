import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { check_authenticated } from "../redux/actions/auth";
import { useEffect } from "react";
import { useState } from "react";
const PrivateRoute = ({ isAuthenticated, check_authenticated }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === null || isAuthenticated === undefined) {
      check_authenticated();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return isAuthenticated === null ||
    isAuthenticated === undefined ? null : !isAuthenticated ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, { check_authenticated })(PrivateRoute);
