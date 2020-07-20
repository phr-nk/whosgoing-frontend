
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from "../util/MyButton"
import{editUserDetails} from '../redux/actions/userAction'
//nui stuff

import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//icons
import EditIcon from '@material-ui/icons/Edit'
//redux
import {connect} from 'react-redux'
const styles = (theme) => ({
    button : {
      float: "right"
    }
})

class EditDetails extends Component {
    state = {
        bio:'',
        website: '',
        location: '',
        open: false
    } 
    componentDidMount() {
        const {credentials} = this.props
        
       this.setUserDetailsToState(credentials)
    }
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      });
    };
    handleOpen = () => {
        this.setState({open:true})
        this.setUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({open:false})
    }
    handleSubmit = () => {
        const userDetails = {
          bio: this.state.bio,
          website: this.state.website,
          location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
      };
    setUserDetailsToState = (creds) => {
        this.setState({
            bio: creds.bio ? creds.bio : '',
            website: creds.website ? creds.website : '',
            location: creds.location ? creds.location : '',
        })
    }
    render() {
        const {classes} = this.props
        return (
           <Fragment>
               <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName= {classes.button}>
                 <EditIcon color="secondary"/>
               </MyButton>
               <Dialog
                   open={this.state.open}
                   onClose={this.handleClose}
                   fullWidth
                   maxWidth="sm"
                >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                        <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                tpye="text"
                label="Website"
                placeholder="Your personal/professinal website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
                        </form>
                    </DialogContent>
                    <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Save
            </Button>
          </DialogActions>
               </Dialog>
           </Fragment>
        )
    }
}
EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes:PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    credentials:state.user.credentials
})
export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails))
