import { combineReducers } from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Categories from "./categories";
import Publications from "./publications";
import Profile from "./profile";
import Notifications from "./notification";

export default combineReducers({
  Auth,
  Alert,
  Categories,
  Publications,
  Profile,
  Notifications,
});
