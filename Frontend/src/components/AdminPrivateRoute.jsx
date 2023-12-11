import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { load_user } from "../redux/actions/auth";

const AdminPrivateRoute = ({ user, load_user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null || user === undefined) {
      load_user();
    } else {
      setLoading(false);
    }
  }, [user]);

  return user === null || user === undefined ? null : user.is_staff ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps, { load_user })(AdminPrivateRoute);
