import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AdminPrivateRoute = ({ user }) => {
  if (!user?.is_staff) return <Navigate to="/" />;
  return <Outlet />;
};
const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps)(AdminPrivateRoute);
