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
import {
  loadFavoriteAlbums,
  loadFavoriteSongs,
  loadFavoritePlaylists
} from "../../actions/favorites";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import AlbumCard from "../albums/AlbumCard";
import SongCard from "../songs/SongCard";
import PlaylistCard from "../playlists/PlaylistCard";
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

export class Favorites extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.loadFavoriteAlbums();
      this.props.loadFavoriteSongs();
      this.props.loadFavoritePlaylists();
    }
  }

  render() {
    const {
      classes,
      albums,
      /*theme,*/ songs,
      playlists,
      isSongsLoading,
      isAlbumsLoading,
      isPlaylistsLoading,
      isDrawerOpen
    } = this.props;

    const marginBtwAlbArt = {
      marginTop: "3%"
    };

    const pageTitle = "Favorites";
    const pageSubtitle = "Your favorites on Devomusic";

    if (isSongsLoading || isAlbumsLoading || isPlaylistsLoading) {
      return <Preloader />;
    } else {
      if (!songs || !albums || !playlists) {
        return (
          <Error message="Something went wrong when trying to load the favorites" />
        );
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
              <div>
                {albums !== undefined &&
                albums !== null &&
                albums.length !== 0 ? (
                  <React.Fragment>
                    <h2>Albums</h2>
                    <Grid container spacing={40}>
                      {albums.map(album => (
                        <Grid
                          item
                          key={album.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          xl={2}
                        >
                          <AlbumCard album={album} isFavorite={true} />
                        </Grid>
                      ))}
                    </Grid>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div style={marginBtwAlbArt}>
                {songs !== undefined && songs !== null && songs.length !== 0 ? (
                  <React.Fragment>
                    <h2>Songs</h2>
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
                          <SongCard song={song} isFavorite={true} />
                        </Grid>
                      ))}
                    </Grid>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
              <div style={marginBtwAlbArt}>
                {playlists !== undefined &&
                playlists !== null &&
                playlists.length !== 0 ? (
                  <React.Fragment>
                    <h2>playlists</h2>
                    <Grid container spacing={40}>
                      {playlists.map(playlist => (
                        <Grid
                          item
                          key={playlist.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          xl={2}
                        >
                          <PlaylistCard playlist={playlist} isFavorite={true} />
                        </Grid>
                      ))}
                    </Grid>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
  isAlbumsLoading: PropTypes.bool.isRequired,
  isPlaylistsLoading: PropTypes.bool.isRequired,
  isSongsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  albums: state.favorites.favoriteAlbums,
  songs: state.favorites.favoriteSongs,
  playlists: state.favorites.favoritePlaylists,
  isSongsLoading: state.favorites.isSongsLoading,
  isAlbumsLoading: state.favorites.isAlbumsLoading,
  isPlaylistsLoading: state.favorites.isPlaylistsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  userId: state.auth.user.id,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { loadFavoriteAlbums, loadFavoriteSongs, loadFavoritePlaylists }
)(withStyles(styles, { withTheme: true })(withRouter(Favorites)));
