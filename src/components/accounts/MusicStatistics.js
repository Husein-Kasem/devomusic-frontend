import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import PageTitle from "../common/PageTitle";
import Preloader from "../common/Preloader";
import Error from "../common/Error";

import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import {
  loadFavoriteAlbumStatistics,
  loadFavoriteSongStatistics,
  loadListenedSongStatistics
} from "../../actions/statistics";

import MusicChart from "./MusicChart";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

const styles = theme => ({
  shiftForDrawerOpen: {
    marginLeft: SHIFT_WHEN_DRAWER_OPEN,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_OPEN}px)`
  },
  shiftForDrawerClosed: {
    marginLeft: SHIFT_WHEN_DRAWER_CLOSE,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_CLOSE}px)`
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
    width: "100%"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  button: {
    margin: "2%",
    width: "30%"
  },
  body: {
    paddingRight: "3.5%"
  }
});

export class MusicStatistics extends React.Component {
  componentDidMount() {
    this.props.loadListenedSongStatistics();
    this.props.loadFavoriteAlbumStatistics();
    this.props.loadFavoriteSongStatistics();
  }

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }

  render() {
    const linkStats = props => <RouterLink to="/admin/stats" {...props} />;

    const {
      classes,
      isDrawerOpen,
      user,
      isAuthenticated,
      listenedSongStats,
      isListenedSongsLoading,
      favoriteSongStats,
      isFavoriteSongsLoading,
      favoriteAlbumStats,
      isFavoriteAlbumsLoading
    } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome admin brother RESPECT!!";

    if (!isAuthenticated) {
      return this.returnUnauthorized();
    } else {
      if (user.type !== "admin") {
        return <Error message="Unauthorized" />;
      } else {
        if (
          !listenedSongStats ||
          listenedSongStats === undefined ||
          listenedSongStats === null ||
          listenedSongStats.length < 1 ||
          isListenedSongsLoading ||
          !favoriteSongStats ||
          favoriteSongStats === undefined ||
          favoriteSongStats === null ||
          favoriteSongStats.length < 1 ||
          isFavoriteSongsLoading ||
          !favoriteAlbumStats ||
          favoriteAlbumStats === undefined ||
          favoriteAlbumStats === null ||
          favoriteAlbumStats.length < 1 ||
          isFavoriteAlbumsLoading
        ) {
          return <Preloader />;
        } else {
          return (
            <div className="container">
              <div>
                <PageTitle
                  isDrawerOpen={isDrawerOpen}
                  title={pageTitle}
                  subtitle={pageSubtitle}
                />
              </div>
              <div className={classes.body}>
                <center>
                  <Link component={linkStats}>
                    <Button className={classes.button} variant="contained">
                      Back
                    </Button>
                  </Link>

                  <MusicChart
                    chartData={listenedSongStats}
                    title={"Most listened songs"}
                  />
                  <MusicChart
                    chartData={favoriteSongStats}
                    title={"Most favorite songs"}
                  />
                  <MusicChart
                    chartData={favoriteAlbumStats}
                    title={"Most favorite albums"}
                  />
                </center>
              </div>
            </div>
          );
        }
      }
    }
  }
}

MusicStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  isListenedSongsLoading: PropTypes.bool.isRequired,
  isFavoriteSongsLoading: PropTypes.bool.isRequired,
  isFavoriteAlbumsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isListenedSongsLoading: state.statistics.isListenedSongsLoading,
  listenedSongStats: state.statistics.listenedSongStats,
  isFavoriteSongsLoading: state.statistics.isFavoriteSongsLoading,
  favoriteSongStats: state.statistics.favoriteSongStats,
  isFavoriteAlbumsLoading: state.statistics.isFavoriteAlbumsLoading,
  favoriteAlbumStats: state.statistics.favoriteAlbumStats
});

export default connect(
  mapStateToProps,
  {
    loadFavoriteAlbumStatistics,
    loadFavoriteSongStatistics,
    loadListenedSongStatistics
  }
)(withStyles(styles, { withTheme: true })(withRouter(MusicStatistics)));
