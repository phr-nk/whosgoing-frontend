import React, { Component } from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid"
import Post from '../components/Post'
import LinearProgress from '@material-ui/core/LinearProgress';
export class home extends Component {
    state = {
        posts: null
    }
    componentDidMount(){
        axios.get("/posts")
        .then(res => {
            this.setState({
                posts : res.data
            })
        })
        .catch(err => {
            console.error(err)
        })
    }
    render() {
        let recentPostMarkup = this.state.posts ? (this.state.posts.map(post => <Post key={post.postId} post = {post} ></Post>)) : <LinearProgress></LinearProgress>
        return (
           <Grid container spacing={10}>
               <Grid item sm={8} xs={12}>
                  {recentPostMarkup}
               </Grid>
               <Grid item sm={4} xs={12}>
                   <p>content</p>
               </Grid>
           </Grid>
        )
    }
}

export default home
