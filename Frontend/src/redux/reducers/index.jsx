import { combineReducers } from "redux";
import Auth from "./auth";
import Alert from "./alert";
import Categories from "./categories";
import Services from "./services";

export default combineReducers({
  Auth,
  Alert,
  Categories,
  Services,
});
