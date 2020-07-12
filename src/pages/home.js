import React, { Component } from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid"
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
        let recentPostMarkup = this.state.posts ? (this.state.posts.map(post => <p>{post.body}</p>)) : <p>Loading</p>
        return (
           <Grid container spacing={16}>
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
