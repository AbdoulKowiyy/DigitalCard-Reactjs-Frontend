import React, { Component } from "react";

import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
//MUI importer
import { ThemeProvider, createTheme } from "@mui/material/styles";
//components Navbar
import Navbar from "./components/Navbar";
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";
//pages
import Anasayfa from "./pages/anasayfa";
import Uyeol from "./pages/uyeol";
import Girisyap from "./pages/girisyap";
import jwtDecode from "jwt-decode";

import ornekProfil from "./components/ornekProfil";
import User from "./pages/User";

//Redux Part
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";
import axios from "axios";
import StaticProfile from "./components/StaticProfile";
import userTwo from "./pages/UserTwo";
import GirisyapUrlTanim from "./pages/GirisyapUrlTanim";

const theme = createTheme(themeFile);
//decode a token install
//npm install --save jwt-decode
//start implement redux
//npm i redux react-redux redux-thunk

//UİD zamanı konrol et.
const token = localStorage.FBIdToken;

axios.defaults.baseURL = "https://us-central1-sosyaltry.cloudfunctions.net/api";

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="container" style={{ height: "100%" }}>
              <Switch>
                <Route exact path="/" component={Anasayfa} />{" "}
                <Route
                  exact
                  path="/id/:userHandle/setting"
                  component={Anasayfa}
                />{" "}
                <Route
                  exact
                  path="/id/BankaBilgi/:ikonId"
                  component={Anasayfa}
                />{" "}
                <Route
                  exact
                  path="/id/SosyalIkons/:ikonId"
                  component={Anasayfa}
                />{" "}
                <Route
                  exact
                  path="/id/kisiseldata/jfkjsdkfjksdjfkjskjfsfkhhfıhueryfyhshdnvbhvchbhjhxhid=?buradhereconfidentiels"
                  component={Anasayfa}
                />{" "}
                <Route
                  exact
                  path="/id/FaturaData/%2Fappengine%2Fquotadetails%3Fauthuser%3D0&project%3Dundefined/permissions?projec?id=?thuser%3D0&project%3Dundefined"
                  component={Anasayfa}
                />{" "}
                <Route
                  exact
                  path="/id/ContactsIkons/:ikonId"
                  component={Anasayfa}
                />{" "}
                <AuthRoute exact path="/register" component={Uyeol} />{" "}
                <AuthRoute exact path="/login" component={Girisyap} />{" "}
                <Route exact path="/ornekProfil" component={ornekProfil} />{" "}
                <Route
                  exact
                  path="/userdfjkjdfkfgjkfdjkghjdsfhjfjdukfjkdshghgdtffrgdsdfjgjkdfjjheryreytfgsfdgfdsghdfsjdfshjdfdfjjthtyretyreryeutrjhfhhgfdbhfdjhdfjfhfdjfggfjjf/:userHandle"
                  component={User}
                />{" "}
                <Route exact path="/:userId/:userHandle" component={User} />{" "}
                <Route exact path="/staticPage" component={StaticProfile} />{" "}
                <Route
                  exact
                  path="/id/:userHandle/:ikonId/:bankabilgi"
                  component={User}
                />{" "}
                <Route exact path="/id/:screamid" component={userTwo} />{" "}
                <Route
                  exact
                  path="/id/:screamid/login"
                  component={GirisyapUrlTanim}
                />
              </Switch>{" "}
            </div>
          </Router>
        </Provider>{" "}
      </ThemeProvider>
    );
  }
}

export default App;

// <Provider store={store}>
// <Router>
//   <Navbar/>
//   <div className='container'>
//   <Routes>
//     <Route exact path="/"  element={<Anasayfa/>} />

//     <AuthRoute exact path="/uyeol"  element={<Uyeol/>}  />
//     <AuthRoute exact path="/girisyap"  element={<Girisyap/>} />
//     <Route exact path="/testLogin"  element={<Login3/>} />
//   </Routes>
//   </div>
// </Router>
// </Provider>
