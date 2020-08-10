import React, { Component, Fragment } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Post from "../components/posts/Post";
import Event from "../components/events/event";
import LinearProgress from "@material-ui/core/LinearProgress";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import {
  getPosts,
  getEvents,
  getCity,
  getUserData,
} from "../redux/actions/dataAction";

var cityDefault = 9426; //chicago
export class home extends Component {
  state = {
    city: cityDefault,
  };
  componentDidMount() {
    this.props.getPosts();

    this.props.getEvents(this.state.city);
  }
  componentWillMount() {}
  render() {
    const { posts, loading, events } = this.props.data;
    const {
      user: {
        authenticated,
        credentials: { location },
      },
    } = this.props;

    let recentPostsMarkup = !loading ? (
      posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      <LinearProgress />
    );

    let eventsMarkup = !loading ? (
      events.map((event) => <Event event={event} />)
    ) : (
      <LinearProgress />
    );

    return (
      <Fragment>
        <Grid
          container
          style={{ width: "85vw", margin: "auto" }}
          spacing={0}
          alignItems={"center"}
        >
          {eventsMarkup}
        </Grid>
        <Grid container spacing={16}>
          <Grid item sm={8} xs={12}>
            {recentPostsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getEvents: PropTypes.func.isRequired,
  getCity: PropTypes.func.isRequired,
  getGetUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});
export default connect(mapStateToProps, {
  getPosts,
  getEvents,
  getCity,
  getUserData,
})(home);
