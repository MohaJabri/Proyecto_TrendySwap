import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
import { get_user_profile } from "../redux/actions/profile";
import { get_notifications } from "../redux/actions/notification";
import { Footer } from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const Layout = (props) => {
  const [huboCambio, setHuboCambio] = useState(false);
  const userId = props.user ? props.user.id : null; // Obtener el ID del usuario

  useEffect(() => {
    props.refresh();
    props.check_authenticated();
    props.load_user();
  }, []);

  useEffect(() => {
    let webSocket = null;

    if (userId) {
      webSocket = new WebSocket(
        `ws://localhost:8000/ws/notification/${userId}/`
      );

      webSocket.onopen = () => {
        console.log("WebSocket Client Connected");
      };

      webSocket.onmessage = (message) => {
        setHuboCambio((prev) => !prev);
      };
    }

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [userId]);

  return (
    <>
      <Navbar update={huboCambio} />
      <ToastContainer autoClose={5000} />
      {props.children}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.Auth.user,
});

export default connect(mapStateToProps, {
  check_authenticated,
  load_user,
  refresh,
})(Layout);
