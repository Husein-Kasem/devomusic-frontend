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
import { loadSongsOfAlbum } from "../../actions/songs";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import SongCard from "./SongCard";
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

export class AlbumSongs extends React.Component {
  componentDidMount() {
    const albumId = this.props.match.params.album_id;
    this.props.loadSongsOfAlbum(albumId);
  }

  render() {
    const {
      classes,
      /*theme,*/ songs,
      isSongsLoading,
      isDrawerOpen
    } = this.props;

    const pageTitle = 
     "Songs";
    const pageSubtitle = "Best songs with devo music";

    if (isSongsLoading) {
      return <Preloader />;
    } else {
      if (songs === null) {
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

AlbumSongs.propTypes = {
  classes: PropTypes.object.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  songs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  songs: state.songs.data,
  isSongsLoading: state.songs.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  { loadSongsOfAlbum }
)(withStyles(styles, { withTheme: true })(withRouter(AlbumSongs)));
