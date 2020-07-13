import React from 'react';

import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import createMuiTheme from '@material-ui/core/styles/createMuiTheme'



//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signUp'
//components
import NavBar from './components/Navbar'
import { ThemeProvider as MuiThemeProvider }  from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette : {
    primary: {
      main: '#fff59d',
      contrastText: "black"
    },
    secondary: {
      main: '#ffd54f',
    },
   },
    typography:{
      useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 20px auto'
    },
    pageTitle: {
      margin: '10px auto 10px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
    },
    progress: {
      position: 'absolute'
    }
  
})
function App() {
  return (
    <MuiThemeProvider theme = {theme}>
    <div className="App">
      <Router>
      <NavBar/>
        <div className="container">
        <Switch>
          <Route exact path='/' component={home}/>
          <Route exact path='/login' component= {login}/>
          <Route exact path='/signup' component= {signup}/>
        </Switch>
        </div>
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
