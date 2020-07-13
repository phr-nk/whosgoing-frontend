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

export class signup extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle: '',
            loading: false,
            errors : {

            }
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] :event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading : true
        })
        const newUserData = {
            email :this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle: this.state.handle
        }
        axios.post('/login', newUserData)
        .then( res => {
            console.log(res.data)
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({
                loading:false
            })
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors : err.response.data,
                loading: false
            })
        })
    }
    render() {
        const { classes } = this.props
        const {errors,loading} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm ><img className={classes.appImage} src={AppIcon} alt="icon" />
                <Typography variant="h2" className ={classes.pageTitle}>Sign Up</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField id="email" name="email" type="email" label ="Email" className={classes.textField} value={this.state.email} onChange = {this.handleChange} helperText={errors.email} error= {errors.email ? true : false} fullWidth/>
                    <TextField id="password" name="password" type="password" label ="Password" className={classes.textField} value={this.state.password} onChange = {this.handleChange} helperText={errors.password } error= {errors.email ? true : false} fullWidth/>
                    <TextField id="confirmpassword" name="confirmpassword" type="confirmpassword" label ="Confirm Password" className={classes.textField} value={this.state.confirmpassword} onChange = {this.handleChange} helperText={errors.confirmPassword } error= {errors.confirmPassword ? true : false} fullWidth/>
                    <TextField id="handle" name="handle" type="handle" label ="Handle" className={classes.textField} value={this.state.handle} onChange = {this.handleChange} helperText={errors.handle } error= {errors.handle ? true : false} fullWidth/>
                   
                    {errors.general && (<Typography variant="body2" className={classes.customError}>
                        {errors.general}
                    </Typography>)}
                    <Button disabled = {loading} type="submit" variant = "contained" color ="secondary" className = {classes.button} value= "Sumbit">Sign Up {loading && (<CircularProgress size ={30} className={classes.progress}/>)}</Button>
                    <br></br>
                    <small>Already have account? Login <Link to ='/login'>here</Link></small>
                </form>
                </Grid>
                <Grid item sm />



            </Grid>
        )
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(signup)
