import React, { Component } from 'react'

import {Link} from 'react-router-dom'
//MUI 
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'
export class Navbar extends Component {
    render() {
        return (
            <AppBar position="fixed">
                <ToolBar className ="NavBar">
                    <Button className= "NavItem" color="inherit" component={Link} to='/login'>Login</Button>
                    <Button className= "NavItem" color="inherit" component={Link} to='/signup'> SignUp</Button>
                    <Button className= "NavItem" color="inherit" component={Link} to='/'>Home</Button>
                </ToolBar>
            </AppBar>
        )
    }
}

export default Navbar
