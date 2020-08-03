import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
//MUI
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataAction";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    objectFit: "cover",
    borderRadius: "50%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  dialogContent: {
    padding: 20,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  visibleSeparator: {
    width: "100%",
    borderBottom: "1px solid rgba(0,0,0,0,0.1)",
    marginBottom: 20,
  },
};

class PostDialog extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="secondary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="secondary"></ChatIcon>
          </MyButton>
          <span> {commentCount} comments </span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand Post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMoreIcon color="secondary"></UnfoldMoreIcon>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  getPost,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
