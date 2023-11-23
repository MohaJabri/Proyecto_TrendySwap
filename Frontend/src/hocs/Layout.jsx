import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
import { get_user_profile } from "../redux/actions/profile";
import { Footer } from "../components/navigation/Footer";
import Navbar from "../components/navigation/Navbar";
import { connect } from "react-redux";
import { useEffect } from "react";

const Layout = (props) => {
  useEffect(() => {
    props.refresh();
    props.check_authenticated();
    props.load_user();
    props.get_user_profile();
  }, []);

  return (
    <div class="flex flex-col h-screen justify-between">
      <div class="h-10 "><Navbar /></div>
      <div class="mb-auto h-10 "><ToastContainer autoClose={5000} />
      {props.children}</div>
      <Footer />
    </div>
  );
};

export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
  get_user_profile,
})(Layout);
