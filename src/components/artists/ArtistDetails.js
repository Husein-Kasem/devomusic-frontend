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
import { formatName, formatPhrase } from "../../utils";
import {
  loadArtistDetails,
  loadArtistAlbums,
  loadArtistSongs,
} from "../../actions/artists";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN,
} from "../../constants";
import AlbumCard from "../albums/AlbumCard";
import SongCard from "../songs/SongCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

const styles = theme => ({
  shiftForDrawerOpen: {
    marginLeft: SHIFT_WHEN_DRAWER_OPEN,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_OPEN}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  shiftForDrawerClosed: {
    marginLeft: SHIFT_WHEN_DRAWER_CLOSE,
    width: `calc(100% - ${SHIFT_WHEN_DRAWER_CLOSE}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
});

export class ArtistDetails extends React.Component {
  componentDidMount() {
    const artistId = this.props.match.params.artist_id;
    this.props.loadArtistDetails(artistId);
    this.props.loadArtistSongs(artistId);
    this.props.loadArtistAlbums(artistId);
  }

  render() {
    var imageStyle = {
      marginLeft: "auto",
      marginRight: "auto",
      height: "90%",
      width: "auto",
    };

    var imageDivStyle = {
      float: "left",
      paddingTop: "1%",
      paddingBottom: "1%",
      paddingLeft: "5%",
      height: "250px",
    };

    const artistName = formatName(this.props.artist.name);
    const artistDescription = formatPhrase(this.props.artist.description);
    const {
      classes,
      albums,
      /*theme,*/ songs,
      isSongsLoading,
      isLoading,
      isDrawerOpen,
      artist,
    } = this.props;

    const marginBtwAlbArt = {
      marginTop: "3%",
    };

    const pageTitle = artistName || "Artist Details";
    const pageSubtitle = artistDescription || "Artist description";

    if (isLoading || isSongsLoading) {
      return <Preloader />;
    } else {
      if (!songs) {
        console.log(songs);
        return (
          <Error message="Something went wrong when trying to load the details of the artist" />
        );
      } else {
        return (
          <div className="container">
            <div style={imageDivStyle}>
              <img style={imageStyle} src={artist.image} alt="artist" />
            </div>
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
                  [classes.shiftForDrawerOpen]: isDrawerOpen,
                },
                {
                  [classes.shiftForDrawerClosed]: !isDrawerOpen,
                }
              )}
            >
              <div>
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
              </div>
              <div style={marginBtwAlbArt}>
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
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

ArtistDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSongLoading: PropTypes.bool.isRequired,
  artist: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.artists.isDetailsLoading,
  artist: state.artists.artistDetails,
  albums: state.artists.artistAlbums,
  songs: state.artists.artistSongs,
  isSongsLoading: state.artists.isSongsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
});

export default connect(
  mapStateToProps,
  { loadArtistDetails, loadArtistAlbums, loadArtistSongs }
)(withStyles(styles, { withTheme: true })(withRouter(ArtistDetails)));
