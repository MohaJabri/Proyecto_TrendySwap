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
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/add_publication" element={<AddPublication />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
