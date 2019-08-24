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
import { loadArtistSongs } from "../../actions/artists";
import { loadFavoriteSongs } from "../../actions/favorites";

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

export class ArtistSongs extends React.Component {
  componentDidMount() {
    const artistId = this.props.match.params.artist_id;
    this.props.loadArtistSongs(artistId);
    if (this.props.isAuthenticated) {
      this.props.loadFavoriteSongs();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
      if (nextProps.isAuthenticated === true) {
        this.props.loadFavoriteSongs();
      }
    }
  }

  render() {
    const {
      classes,
      /*theme,*/ songs,
      isSongsLoading,
      isDrawerOpen,
      favoriteSongs
    } = this.props;

    const pageTitle =
      (songs && songs[0] && songs[0].artist.name) || "Artist songs";
    const pageSubtitle =
      (songs && songs[0] && songs[0].artist.description) ||
      "Best songs of the artist";

    if (isSongsLoading) {
      return <Preloader />;
    } else {
      if (songs === null) {
        return (
          <Error message="Something went wrong when trying to load songs of the artist" />
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
                {songs.map(song => {
                  let isFav = false;
                  if (favoriteSongs !== null && favoriteSongs !== undefined) {
                    for (let i = 0; i < favoriteSongs.length; i++) {
                      if (favoriteSongs[i].id === song.id) {
                        isFav = true;
                        break;
                      } else {
                        isFav = false;
                      }
                    }
                  }
                  return (
                    <Grid
                      item
                      key={song.id}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={4}
                    >
                      <SongCard song={song} isFavorite={isFav} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        );
      }
    }
  }
}

ArtistSongs.propTypes = {
  classes: PropTypes.object.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  songs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  songs: state.artists.artistSongs,
  isSongsLoading: state.artists.isSongsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { loadArtistSongs, loadFavoriteSongs }
)(withStyles(styles, { withTheme: true })(withRouter(ArtistSongs)));
