import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadPlaylistSongs } from "../../actions/playlists";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import SongCard from "../songs/SongCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

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
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`
  }
});

export class PlaylistSongs extends React.Component {
  componentDidMount() {
    const PlaylistId = this.props.match.params.playlist_id;
    this.props.loadPlaylistSongs(PlaylistId);
  }

  render() {
    const {
      classes,
      /*theme,*/ songs,
      isSongsLoading,
      isDrawerOpen
    } = this.props;

    const pageTitle = "Songs";
    const pageSubtitle = "Best songs with devo music";

    if (isSongsLoading) {
      return <Preloader />;
    } else {
      if (!songs) {
        return (
          <Error message="Something went wrong when trying to load songs of the album" />
        );
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
              <Grid container spacing={40}>
                {songs.map(song => (
                  <Grid
                    item
                    key={song.id}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={4}
                  >
                    <SongCard song={song} />
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        );
      }
    }
  }
}

PlaylistSongs.propTypes = {
  classes: PropTypes.object.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  songs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  songs: state.playlists.songs,
  isSongsLoading: state.playlists.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  { loadPlaylistSongs }
)(withStyles(styles, { withTheme: true })(withRouter(PlaylistSongs)));
