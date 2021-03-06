import React, { Component } from 'react'
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from 'prop-types'
import AppIcon from '../images/wg_icon.png'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

//REDUX 
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userAction'
const styles = {
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
      },
      appImage: {
        height : 100
    } 
}
class login extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors : {

            }
        }
    }
    componentWillReceiveProps (nextProps){
        if(nextProps.UI.errors)
        {
            this.setState({errors : nextProps.UI.errors})
        }
    
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] :event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            email :this.state.email,
            password : this.state.password
        }
        this.props.loginUser(userData,this.props.history)
    }
    render() {
        const { classes, UI : {loading}} = this.props
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm ><img className={classes.appImage} src={AppIcon} alt="icon" />
                <Typography variant="h2" className ={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label ="Email" className={classes.textField} value={this.state.email} onChange = {this.handleChange} helperText={errors.email} error= {errors.email ? true : false} fullWidth/>
                    <TextField id="password" name="password" type="password" label ="Password" className={classes.textField} value={this.state.password} onChange = {this.handleChange} helperText={errors.password } error= {errors.email ? true : false} fullWidth/>
                    {errors.general && (<Typography variant="body2" className={classes.customError}>
                        {errors.general}
                    </Typography>)}
                    <Button disabled = {loading} type="submit" variant = "contained" color ="secondary" className = {classes.button} value= "Sumbit">Sumbit {loading && (<CircularProgress size ={30} className={classes.progress}/>)}</Button>
                    <br></br>
                    <small>No account? Sign up <Link to ='/signup'>here</Link></small>
                </form>
                </Grid>
                <Grid item sm />



            </Grid>
        )
    }
}
login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})
const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login))
