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
import MuiThemeProvider  from '@material-ui/core/styles/MuiThemeProvider';

const theme = createMuiTheme({
  palette : {
    primary: {
      main: '#fff59d',
    },
    secondary: {
      main: '#ffd54f',
    },
    typography:{
      useNextVariants: true
    }
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
