import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadArtistAlbums } from "../../actions/artists";
import { withRouter } from "react-router";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import AlbumCard from "./AlbumCard";
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

export class ArtistAlbums extends React.Component {
  componentWillMount() {
    const artistId = this.props.match.params.artist_id;
    this.props.loadArtistAlbums(artistId);
  }

  render() {
    const { classes, albums, isAlbumsLoading, isDrawerOpen } = this.props;

    const pageTitle =
      (albums && albums[0] && albums[0].artist.name) || "Artist albums";
    const pageSubtitle =
      (albums && albums[0] && albums[0].artist.description) ||
      "Best albums of the artist";

    if (isAlbumsLoading) {
      return <Preloader />;
    } else {
      if (albums === null) {
        return (
          <Error message="Something went wrong when trying to load albums of the artist" />
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
                {albums.map(album => (
                  <Grid item key={album.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <AlbumCard album={album} />
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

ArtistAlbums.propTypes = {
  classes: PropTypes.object.isRequired,
  albums: PropTypes.array,
  isAlbumsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  albums: state.artists.artistAlbums,
  isAlbumsLoading: state.artists.isAlbumsLoading,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  { loadArtistAlbums }
)(withStyles(styles, { withTheme: true })(withRouter(ArtistAlbums)));
