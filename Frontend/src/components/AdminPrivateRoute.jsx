import { Outlet, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { load_user } from "../redux/actions/auth";

// ... (tu import y código existente)

const AdminPrivateRoute = ({ user, load_user }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      await load_user(); // Intenta cargar el usuario

      setLoading(false);
    };

    if (!user) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, [user, load_user]);

  if (loading) {
    return null; // Mientras carga el usuario, muestra un loader o algo similar
  }

  if (!user) {
    return <Navigate to="/" />; // Redirige si el usuario no está autenticado
  }

  if (!user.is_staff) {
    return <Navigate to="/" />; // Redirige si el usuario no es staff
  }

  return <Outlet />;
};

// ... (tu código mapStateToProps y export)

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps, { load_user })(AdminPrivateRoute);
