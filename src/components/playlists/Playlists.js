import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import PlaylistCard from "./PlaylistCard";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { loadPlaylists } from "../../actions/playlists";
import { loadFavoritePlaylists } from "../../actions/favorites";

import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";

const pageTitle = "Playlists";
const pageSubtitle = "Best playlists on devo music";

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

export class Playlists extends React.Component {
  componentWillMount() {
    this.props.loadPlaylists();
    if (this.props.isAuthenticated) {
      this.props.loadFavoritePlaylists();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
      this.props.loadFavoritePlaylists();
    }
  }

  render() {
    const {
      classes,
      playlists,
      isPlaylistLoading,
      isDrawerOpen,
      favoritePlaylists,
      isFavoritePlaylistsLoading
    } = this.props;

    if (isPlaylistLoading || isFavoritePlaylistsLoading) {
      return <Preloader />;
    } else {
      if (!playlists) {
        return (
          <Error message="Something went wrong when trying to load playlists" />
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
        );
      }
    }
  }
}

Playlists.propTypes = {
  classes: PropTypes.object.isRequired,
  playlists: PropTypes.array,
  isPlaylistLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists.playlists,
  isPlaylistLoading: state.playlists.isLoading,
  user: state.auth.user,
  isDrawerOpen: state.drawer.isDrawerOpen,
  isFavoritePlaylistsLoading: state.favorites.isPlaylistsLoading,
  favoritePlaylists: state.favorites.favoritePlaylists,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadPlaylists, loadFavoritePlaylists }
)(withStyles(styles, { withTheme: true })(Playlists));
