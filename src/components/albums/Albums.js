import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadAlbums } from "../../actions/albums";
import { loadFavoriteAlbums } from "../../actions/favorites";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import AlbumCard from "./AlbumCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

const pageTitle = "Albums";
const pageSubtitle = "Best albums with devo music";

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

export class Albums extends React.Component {
  componentDidMount() {
    this.props.loadAlbums();
    if (this.props.isAuthenticated) {
      this.props.loadFavoriteAlbums();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.props.loadFavoriteAlbums();
    }
  }

  render() {
    const {
      classes,
      albums,
      isAlbumsLoading,
      isDrawerOpen,
      favoriteAlbums,
      isFavoriteAlbumsLoading
    } = this.props;

    if (isAlbumsLoading || isFavoriteAlbumsLoading) {
      return <Preloader />;
    } else {
      if (!albums) {
        return (
          <Error message="Something went wrong when trying to load albums" />
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
                {albums.map(album => {
                  let isFav = false;
                  if (favoriteAlbums !== null && favoriteAlbums !== undefined) {
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
          </div>
        );
      }
    }
  }
}

Albums.propTypes = {
  classes: PropTypes.object.isRequired,
  albums: PropTypes.array,
  isAlbumsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  albums: state.albums.data,
  isAlbumsLoading: state.albums.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  isFavoriteAlbumsLoading: state.favorites.isAlbumsLoading,
  favoriteAlbums: state.favorites.favoriteAlbums,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadAlbums, loadFavoriteAlbums }
)(withStyles(styles, { withTheme: true })(Albums));
