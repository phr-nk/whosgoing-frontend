
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from "../../util/MyButton"

//nui stuff

import Button from '@material-ui/core/Button'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
//icons

import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//redux
import {connect} from 'react-redux'
import {postPost,clearErrors} from '../../redux/actions/dataAction'

const styles = theme => ( {
        
        submitButton : {
            position: 'relative',

        },
        progressSpinner : {
            position: 'absolute'
        },
        closeButton : {
            position:'absolute',
            left: '90%',
            top: '10%'
        }
})
class PostPost extends Component{
    state = {
        open : false,
        body: "",
        errors: {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
              errors: nextProps.UI.errors
            });
          }
          if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
          }
    }
    handleOpen = () => {
        this.setState({open : true})
    }
    handleClose = () => {
        this.props.clearErrors()
        this.setState({open : false, errors : {} } )
    }
    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        
        if(this.state.body === '')
        {
            this.setState({errors : { body : 'Write something!'}})
            
            return
        }
        else 
        {
            this.props.postPost({body : this.state.body}) 
        }
    }
    render() {
        const {errors} = this.state
        const {classes, UI :{ loading} } = this.props
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Make a post!">
                    <AddIcon color="secondary"></AddIcon>
                </MyButton>
                <Dialog open = {this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} btnClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                <DialogTitle>Make a new Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit}>
                        <TextField name="body" type="text" label="post something" multiline rows="3" placeholder ="make a post" error={errors.body ? true : false} helperText={errors.body} className={classes.TextField} onChange={this.handleChange} fullWidth/>
                        <Button type="submit" variant="contained" color="secondary" className={classes.submitButton} disabled={loading}>
                            Sumbit
                           {loading && ( <CircularProgress className={classes.progressSpinner}/>)}
                        </Button>
                    </form>
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostPost.propTypes = {
    postPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    UI: state.UI
})
export default connect(mapStateToProps, {postPost, clearErrors})(withStyles(styles)(PostPost))