import React, { Component,Fragment} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import PostPost from './PostPost'
//MUI 
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Button from '@material-ui/core/Button'


import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import Notifications from "@material-ui/icons/Notifications"
export class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar position="fixed">
                <ToolBar className ="NavBar">
                    {authenticated ? (
                        <Fragment>
                            <PostPost/>
                            <Link to='/'>
                            <MyButton tip = "Home">
                                <HomeIcon color="secondary"/>
                            </MyButton>
                            </Link>
                            <MyButton tip = "Notifications">
                                <Notifications color="secondary"/>
                            </MyButton>
                        </Fragment>
                    ) : (
                        <Fragment>
                              <Button className= "NavItem" color="inherit" component={Link} to='/login'>Login</Button>
                              <Button className= "NavItem" color="inherit" component={Link} to='/signup'> SignUp</Button>
                              <Button className= "NavItem" color="inherit" component={Link} to='/'>Home</Button>
                        </Fragment>
                    )}
               </ToolBar>
            </AppBar>
        )
    }
}
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = state => ({
    authenticated : state.user.authenticated
})

export default connect(mapStateToProps)(Navbar)
