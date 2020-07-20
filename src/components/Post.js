import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import { Link }  from 'react-router-dom'
import DeletePost from './DeletePost'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import{likePost, unlikePost} from '../redux/actions/dataAction'
import MyButton from '../util/MyButton'
import ChatIcon from "@material-ui/icons/Chat"
import FavIcon from "@material-ui/icons/Favorite"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder"
import {connect} from 'react-redux'

const styles = {
    card :{
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
        marginRight: 10
    },
    image: {
        minWidth:200
    },
    content : {
        padding: 25,
        objectFit: 'cover'
    }
}
class Post extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.postId === this.props.post.postId))
            return true
        else 
            return false
    }
    likePost = () => {
      
        this.props.likePost(this.props.post.postId)
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postId)
    }
    render() {
        dayjs.extend(relativeTime)
        const {classes, post : {userImage,body,createdAt,userHandle,postId,likeCount,commentCount}, user : { authenticated, credentials : {handle}}} = this.props
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
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost postId = {postId} />
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia className = {classes.image} image={userImage} title ="Profile Image"/>
                <CardContent className = {classes.CardContent}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color={"secondary"}>{userHandle}</Typography>
                    <Typography variant="body2"  color ="textSecondary" >{dayjs(createdAt).fromNow()}</Typography>
                    {deleteButton}
                    <Typography variant="body1" >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes </span>
                    <MyButton tip="comments">
                        <ChatIcon color ="secondary"></ChatIcon>
                    </MyButton>
                    <span> {commentCount} comments </span>
                </CardContent>
            </Card>
        )
    }
}
Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    user:state.user
})
const mapActionToProps = {
    likePost,
    unlikePost
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Post))
