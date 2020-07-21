import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'

//MUI
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'


import DeleteOuline from '@material-ui/icons/DeleteOutline'

import {connect} from 'react-redux'
import{deletePost} from '../../redux/actions/dataAction'

const styles = {
    deleteButton : {
        position: 'absolute',
        left: '90%',
        top:'10%'
    }
}
class DeletePost extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    deletePost= () => {
        this.props.deletePost(this.props.postId)
        this.setState({open: false})
    }
    render() {
    const {classes} = this.props
    
        return (
            <Fragment>
                <MyButton tip ="Delete post" onClick= {this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteOuline/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure you want to delete? 
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Cancel</Button>
                        <Button onClick={this.deletePost}>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}
DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

export default connect(null, {deletePost})(withStyles(styles)( DeletePost))
