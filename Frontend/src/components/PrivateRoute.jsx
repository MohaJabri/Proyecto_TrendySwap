import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Outlet />;
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
