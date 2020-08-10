import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import themeFile from "./util/theme";
import AuthRoute from "./util/AuthRoute";
import footerImage from "./images/footerPic.png";
import axios from "axios";
//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signUp";
import user from "./pages/user";
//components
import NavBar from "./components/layout/Navbar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
//redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { SET_AUTHENTICATED } from "./redux/reducers/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

axios.defaults.baseURL =
  "https://us-central1-whosgoing-ce730.cloudfunctions.net/api";
const theme = createMuiTheme(themeFile);
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="App">
            <Router>
              <NavBar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route
                    exact
                    path="/users/:handle/post/:postId"
                    component={user}
                  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
        <a href="https://phrank.me" target="_blank" rel="noopener noreferrer">
          <p className="footerText">Made by Frank Lenoci</p>
        </a>
        <img src={footerImage} className="footer"></img>
      </MuiThemeProvider>
    );
  }
}

export default App;
