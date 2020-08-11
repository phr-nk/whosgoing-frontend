import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Map, Marker, TileLayer } from "react-leaflet";
import ChatIcon from "@material-ui/icons/Chat";
import FavIcon from "@material-ui/icons/Favorite";
import FavBorderIcon from "@material-ui/icons/FavoriteBorder";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { connect } from "react-redux";
import "./mediaQuerries.css";
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "20vw",
    marginBottom: 20,

    marginRight: 20,
    height: 300,
  },
  image: {
    minWidth: 150,
    height: 100,
  },
  content: {
    padding: 25,
    height: 50,
    objectFit: "cover",
  },
  icon: {
    postion: "absolute",
    height: 100,
    left: 20,
    top: 20,
  },
};
class Event extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      event: {
        displayName,
        uri,
        location: { lat, lng },
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent className={classes.image}>
          <Map center={[lat, lng]} zoom={15} className={classes.image}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[lat, lng]} />
          </Map>
        </CardContent>

        <CardContent className={classes.content}>
          <a href={uri}>
            <Typography
              variant="body1
            "
              color={"textPrimary"}
            >
              {displayName}
            </Typography>
          </a>
        </CardContent>
        <CardActions disableSpacing>
          <MyButton tip="Who's going?" className={classes.icon}>
            <SupervisorAccountIcon color="secondary"></SupervisorAccountIcon>
          </MyButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Event);
