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
  loadSearchAlbums,
  loadSearchSongs,
  loadSearchPlaylists,
  loadSearchArtists,
  addCommonSearch
} from "../../actions/search";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import AlbumCard from "../albums/AlbumCard";
import SongCard from "../songs/SongCard";
import PlaylistCard from "../playlists/PlaylistCard";
import ArtistCard from "../artists/ArtistCard";
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

export class Search extends React.Component {
  componentDidMount() {
    const name = this.props.match.params.search_name;
    this.props.loadSearchAlbums(name);
    this.props.loadSearchSongs(name);
    this.props.loadSearchPlaylists(name);
    this.props.loadSearchArtists(name);
    this.props.addCommonSearch(name);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.search_name !== this.props.match.params.search_name
    ) {
      let name = nextProps.match.params.search_name;
      this.props.loadSearchAlbums(name);
      this.props.loadSearchSongs(name);
      this.props.loadSearchPlaylists(name);
      this.props.loadSearchArtists(name);
      this.props.addCommonSearch(name);
    }
  }

  render() {
    const {
      classes,
      albums,
      /*theme,*/

      songs,
      playlists,
      artists,
      isSongsLoading,
      isAlbumsLoading,
      isPlaylistsLoading,
      isDrawerOpen
    } = this.props;

    const marginBtwAlbArt = {
      marginTop: "3%"
    };

    const pageTitle = "Search";
    const pageSubtitle = "Search result";

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
                {(artists !== undefined &&
                  artists !== null &&
                  artists.length !== 0) ||
                (albums !== undefined &&
                  albums !== null &&
                  albums.length !== 0) ||
                (songs !== undefined && songs !== null && songs.length !== 0) ||
                (playlists !== undefined &&
                  playlists !== null &&
                  playlists.length !== 0) ? (
                  <React.Fragment>
                    <div>
                      {artists !== undefined &&
                      artists !== null &&
                      artists.length !== 0 ? (
                        <React.Fragment>
                          <h2>Artists</h2>
                          <Grid container spacing={40}>
                            {artists.map(artist => (
                              <Grid
                                item
                                key={artist.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={2}
                              >
                                <ArtistCard artist={artist} />
                              </Grid>
                            ))}
                          </Grid>
                        </React.Fragment>
                      ) : (
                        ""
                      )}

                      <div style={marginBtwAlbArt}>
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
                                  <AlbumCard album={album} />
                                </Grid>
                              ))}
                            </Grid>
                          </React.Fragment>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div style={marginBtwAlbArt}>
                      {songs !== undefined &&
                      songs !== null &&
                      songs.length !== 0 ? (
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
                                <SongCard song={song} />
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
                                <PlaylistCard playlist={playlist} />
                              </Grid>
                            ))}
                          </Grid>
                        </React.Fragment>
                      ) : (
                        ""
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <h2>no results</h2>
                )}
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  isAlbumsLoading: PropTypes.bool.isRequired,
  isPlaylistsLoading: PropTypes.bool.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  isArtistsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  albums: state.search.searchAlbums,
  songs: state.search.searchSongs,
  playlists: state.search.searchPlaylists,
  artists: state.search.searchArtists,
  isSongsLoading: state.search.isSongsLoading,
  isAlbumsLoading: state.search.isAlbumsLoading,
  isPlaylistsLoading: state.search.isPlaylistsLoading,
  isArtistsLoading: state.search.isArtistsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  {
    loadSearchAlbums,
    loadSearchSongs,
    loadSearchPlaylists,
    loadSearchArtists,
    addCommonSearch
  }
)(withStyles(styles, { withTheme: true })(withRouter(Search)));
