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
  loadRecommendedAlbums,
  loadRecommendedSongs,
  loadRecommendedPlaylists
} from "../../actions/recommended";
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

export class Recommended extends React.Component {
  componentWillMount() {
    const userId = this.props.userId;
    this.props.loadRecommendedAlbums(userId, 4);
    this.props.loadRecommendedSongs(userId, 5);
    this.props.loadRecommendedPlaylists(userId, 5);

    this.props.loadFavoriteAlbums();
    this.props.loadFavoritePlaylists();
    this.props.loadFavoriteSongs();
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
      isDrawerOpen,
      favoriteAlbums,
      favoriteSongs,
      favoritePlaylists,
      isFavoritesLoading
    } = this.props;

    const marginBtwAlbArt = {
      marginTop: "3%"
    };

    const pageTitle = "Recommended";
    const pageSubtitle = "Your recommendations on Devomusic";

    if (
      isSongsLoading ||
      isAlbumsLoading ||
      isPlaylistsLoading ||
      isFavoritesLoading
    ) {
      return <Preloader />;
    } else {
      if (!songs) {
        console.log(songs);
        return (
          <Error message="Something went wrong when trying to load the recommended" />
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
                <h2>Albums</h2>
                <Grid container spacing={40}>
                  {albums.map(album => {
                    let isFav = false;
                    if (
                      favoriteAlbums !== null &&
                      favoriteAlbums !== undefined
                    ) {
                      for (let i = 0; i < favoriteAlbums.length; i++) {
                        if (favoriteAlbums[i].id === album.id) {
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
                        key={album.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                      >
                        <AlbumCard album={album} isFavorite={isFav} />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
              <div style={marginBtwAlbArt}>
                <h2>Songs</h2>
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
                        xl={6}
                      >
                        <SongCard song={song} isFavorite={isFav} />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
              <div style={marginBtwAlbArt}>
                <h2>playlists</h2>
                <Grid container spacing={40}>
                  {playlists.map(playlist => {
                    let isFav = false;
                    if (
                      favoritePlaylists !== null &&
                      favoritePlaylists !== undefined
                    ) {
                      for (let i = 0; i < favoritePlaylists.length; i++) {
                        if (favoritePlaylists[i].id === playlist.id) {
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
                        key={playlist.id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                      >
                        <PlaylistCard playlist={playlist} isFavorite={isFav} />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

Recommended.propTypes = {
  classes: PropTypes.object.isRequired,
  isAlbumsLoading: PropTypes.bool.isRequired,
  isPlaylistsLoading: PropTypes.bool.isRequired,
  isSongsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  albums: state.recommended.recommendedAlbums,
  songs: state.recommended.recommendedSongs,
  playlists: state.recommended.recommendedPlaylists,
  isSongsLoading: state.recommended.isSongsLoading,
  isAlbumsLoading: state.recommended.isAlbumsLoading,
  isPlaylistsLoading: state.recommended.isPlaylistsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  userId: state.auth.user.id,
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  favoriteAlbums: state.favorites.favoriteAlbums,
  favoritePlaylists: state.favorites.favoritePlaylists,
  favoriteSongs: state.favorites.favoriteSongs,
  isFavoritesLoading:
    state.favorites.isAlbumsLoading &&
    state.favorites.isSongsLoading &&
    state.favorites.isPlaylistsLoading
});

export default connect(
  mapStateToProps,
  {
    loadRecommendedAlbums,
    loadRecommendedSongs,
    loadRecommendedPlaylists,
    loadFavoriteSongs,
    loadFavoritePlaylists,
    loadFavoriteAlbums
  }
)(withStyles(styles, { withTheme: true })(withRouter(Recommended)));
