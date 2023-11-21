import { combineReducers } from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Categories from "./categories";
import Services from "./services";
import Profile from "./profile";

export default combineReducers({
  Auth,
  Alert,
  Categories,
  Services,
  Profile,
});
