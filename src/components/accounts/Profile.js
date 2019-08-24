import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { connect } from "react-redux";
import PageTitle from "../common/PageTitle";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Preloader from "../common/Preloader";
import AlbumIcon from "@material-ui/icons/Album";
import EditIcon from "@material-ui/icons/Edit";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import MusicIcon from "@material-ui/icons/MusicVideo";
import Typography from "@material-ui/core/Typography";
import {
  loadProfileSongCount,
  loadProfileAlbumCount
} from "../../actions/profile";
import { reloadUser } from "../../actions/auth";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
const pageTitle = "Profile";
const pageSubtitle = "Your profile page";

//profile component for the profile page
const editLink = props => <RouterLink to="/myaccount" {...props} />;
const styles = theme => ({
  shiftForDrawerOpen: {
    marginLeft: SHIFT_WHEN_DRAWER_OPEN,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_OPEN}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  shiftForDrawerClosed: {
    marginLeft: SHIFT_WHEN_DRAWER_CLOSE,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_CLOSE}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  bigAvatar: {
    margin: 0,
    width: 200,
    height: 200
  },
  iconsM: {
    padding: "2%"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`
  },
  primary: {
    color: "primary",
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700]
    }
  }
});

function capitalizeFirstLetter(string) {
  if (string && string.length > 2) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export class Profile extends React.Component {
  componentDidMount() {
    const userId = this.props.userId;
    if (userId) {
      this.props.loadProfileSongCount(userId);
      this.props.loadProfileAlbumCount(userId);
      this.props.reloadUser();
    }
  }

  // componentWillReceiveProps({ userId }) {
  //   console.log("---", userId, "---");
  //   if (userId && this.props.userId !== userId) {
  //     this.props.loadProfileSongCount(this.props.userId);
  //     this.props.loadProfileAlbumCount(this.props.userId);
  //     this.props.reloadUser();
  //   }
  // }

  render() {
    const {
      classes,
      isDrawerOpen,
      isCountLoading,
      songCount,
      albumCount,
      image,
      imageDate,
      isUserLoading
    } = this.props;
    if (isCountLoading || isUserLoading) {
      return <Preloader />;
    } else {
      return (
        <div className="container">
          <PageTitle
            isDrawerOpen={isDrawerOpen}
            title={pageTitle}
            subtitle={pageSubtitle}
          />
          <div
            className={classNames(
              classes.cardGrid,
              {
                [classes.shiftForDrawerOpen]: isDrawerOpen
              },
              {
                [classes.shiftForDrawerClosed]: !isDrawerOpen
              }
            )}
          >
            <div className="col-md-6 m-auto">
              <div className="card card-body">
                <Grid
                  container
                  direction="column"
                  justify="space-around"
                  alignItems="center"
                  spacing={40}
                >
                  <Grid item xs={12}>
                    <Avatar
                      alt="Remy Sharp"
                      src={image + "?" + imageDate}
                      className={classes.bigAvatar}
                    />
                  </Grid>

                  <Grid container className={classes.iconsM}>
                    <Grid item xs={12} sm={4}>
                      <div className="form-group">
                        <label>
                          Username: {capitalizeFirstLetter(this.props.username)}
                        </label>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={4} />
                    <Grid item xs={12} sm={4}>
                      <AlbumIcon />
                      <Typography>{albumCount}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.iconsM}>
                    <Grid item xs={12} sm={4}>
                      <div className="form-group">
                        <label>
                          Email: {capitalizeFirstLetter(this.props.mail)}
                        </label>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={4} />
                    <Grid item xs={12} sm={4}>
                      <MusicIcon />
                      <Typography>{songCount}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Link component={editLink} color="inherit">
                  <Button variant="contained" className={classes.primary}>
                    Edit
                    <EditIcon />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  isUserLoading: state.auth.isReloading,
  isAuthenticated: state.auth.isAuthenticated,
  isDrawerOpen: state.drawer.isDrawerOpen,
  username: state.auth.user.username,
  mail: state.auth.user.email,
  image: state.auth.user.profileImage,
  imageDate: state.auth.user.imageDate,
  userId: state.auth.user.id,
  token: state.auth.token,
  songCount: state.profile.numberOfSongs,
  isCountLoading: state.profile.isCountLoading,
  albumCount: state.profile.numberOfAlbums,
  isAlbumCountLoading: state.profile.isAlbumCountLoading
});

export default connect(
  mapStateToProps,
  { loadProfileSongCount, loadProfileAlbumCount, reloadUser }
)(withStyles(styles, { withTheme: true })(Profile));
