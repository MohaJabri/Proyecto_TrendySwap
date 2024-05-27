import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./containers/auth/Login";
import Signup from "./containers/auth/Signup";
import Activate from "./containers/auth/Activate";
import ResetPassword from "./containers/auth/ResetPassword";
import ResetPasswordConfirm from "./containers/auth/ResetPasswordConfirm";
import Swap from "./containers/Swap";
import PublicationDetail from "./containers/pages/PublicationDetail";
import Search from "./containers/pages/Search";
import Profile from "./containers/pages/Profile";
import AdminPage from "./containers/pages/AdminPage";
import AddPublication from "./containers/pages/AddPublication";
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Notifications from "./containers/pages/Notifications";
import UserPublications from "./containers/pages/UserPublications";
import UpdatePublication from "./containers/pages/UpdatePublication";
import About from "./containers/pages/About";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route exact path="/" element={<Home />} />

          {/*Rutas de autenticación*/}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="activate/:uid/:token" element={<Activate />} />
          <Route exact path="reset_password" element={<ResetPassword />} />
          <Route
            exact
            path="password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />

          {/*Rutas de la aplicación*/}
          <Route exact path="/swap" element={<Swap />} />
          <Route
            exact
            path="/publication/:publicationId"
            element={<PublicationDetail />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/profile/:userId" element={<Profile />} />
            <Route exact path="/add_publication" element={<AddPublication />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route
              exact
              path="/user_publications"
              element={<UserPublications />}
            />
            <Route
              exact
              path="/update_publication/:publicationId"
              element={<UpdatePublication />}
            />
          </Route>

          {/*Rutas de administrador*/}
          <Route element={<AdminPrivateRoute />}>
            <Route exact path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
