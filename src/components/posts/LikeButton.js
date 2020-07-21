import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavIcon from "@material-ui/icons/Favorite"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder";
// REdux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataAction'
class LikeButton extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.postId === this.props.postId))
            return true
        else 
            return false
    }
    likePost = () => {
      
        this.props.likePost(this.props.postId)
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.postId)
    }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
              <MyButton tip="Like">
                <FavBorderIcon color="secondary" />
              </MyButton>
            </Link>
          ) : this.likedPost() ? (
            <MyButton tip="Undo like" onClick={this.unlikePost}>
              <FavIcon color="secondary" />
            </MyButton>
          ) : (
            <MyButton tip="Like" onClick={this.likePost}>
              <FavBorderIcon color="secondary" />
            </MyButton>
          );
          return likeButton
    }
}
LikeButton.propTypes = {
    user : PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapActionsToProps = {
  likePost,
  unlikePost
};
export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);
