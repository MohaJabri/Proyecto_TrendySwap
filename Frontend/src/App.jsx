import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Provider } from "react-redux";
import store from "./store";
import Error404 from "./containers/errors/Error404";
import Home from "./containers/Home";
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
import Footer from "./components/navigation/Footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContainer>
          <MainContent>
            <Routes>
              <Route path="*" element={<Error404 />} />
              <Route exact path="/" element={<Home />} />
              {/* Rutas de autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/activate/:uid/:token" element={<Activate />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route
                path="/password/reset/confirm/:uid/:token"
                element={<ResetPasswordConfirm />}
              />
              {/* Rutas de la aplicación */}
              <Route path="/swap" element={<Swap />} />
              <Route
                path="/publication/:publicationId"
                element={<PublicationDetail />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/add_publication" element={<AddPublication />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route
                  path="/user_publications"
                  element={<UserPublications />}
                />
                <Route
                  path="/update_publication/:publicationId"
                  element={<UpdatePublication />}
                />
              </Route>
              {/* Rutas de administrador */}
              <Route element={<AdminPrivateRoute />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </Provider>
  );
}

export default App;
