import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from 'jwt-decode'
import themeFile from './util/theme'
import AuthRoute from './util/AuthRoute'

//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signUp'
//components
import NavBar from './components/Navbar'
import { ThemeProvider as MuiThemeProvider }  from '@material-ui/core/styles';
//redux
import {Provider} from 'react-redux'
import store from './redux/reducers/store'
const theme = createMuiTheme(themeFile)
const token = localStorage.FBIdToken
let authenticated
if(token)
{
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href ='/login'
  }
  else {
    authenticated = true
  }
}
class App extends React.Component{
  render() {

  return (
    <MuiThemeProvider theme = {theme}>
    <Provider store={store}>
    <div className="App">
      <Router>
      <NavBar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component={home}/>
          <AuthRoute exact path='/login' component= {login} authenticated = {authenticated}/>
          <AuthRoute exact path='/signup' component= {signup} authenticated = {authenticated}/>
        </Switch>
        </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  );
}
}

export default App;
