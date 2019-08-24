import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import Link from "@material-ui/core/Link";
import {
  addPlaylistFavorite,
  removePlaylistFromFavorite
} from "../../actions/favorites";
import { deletePlaylist } from "../../actions/playlists";
import PlayIcon from "@material-ui/icons/PlayArrow";
import { playGroupOfSongs } from "../../actions/musicPlayer";

import { formatName, formatPhrase } from "../../utils";
import { connect } from "react-redux";
import FavoriteIcon from "@material-ui/icons/StarBorder";
import FavoriteIconFilled from "@material-ui/icons/Star";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import DeleteIconFilled from "@material-ui/icons/Delete";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 0
  },
  cardContent: {
    flexGrow: 1
  },
  margin5: {
    marginTop: "10px"
  }
});

class PlaylistCard extends React.Component {
  // a state to animate the cards
  state = {
    isCardRaised: false,
    selectedPlaylist: {}
  };

  toggleRaised = () => {
    this.setState({ isCardRaised: !this.state.isCardRaised });
  };

  createLinkForPlaylist(playlistId) {
    return props => {
      return <RouterLink to={`/playlistsongs/${playlistId}`} {...props} />;
    };
  }

  handelDeletePlaylist = (playlist, e) => {
    this.props.deletePlaylist(playlist);
    //e.stopPropagation();
    //e.nativeEvent.stopImmediatePropagation();
  };

  handleFavoriteButtonClick(playlist) {
    if (this.props.isFavorite) {
      this.props.removePlaylistFromFavorite(playlist);
    } else {
      this.props.addPlaylistFavorite(playlist);
    }
  }

  handelPlayPlaylistClick(songs) {
    this.props.playGroupOfSongs(songs);
  }

  render() {
    const { classes, playlist, isAuthenticated, isFavorite, user } = this.props;
    const tooltipText = isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

    return (
      playlist && (
        <Card
          className={classes.card}
          onMouseEnter={this.toggleRaised}
          onMouseLeave={this.toggleRaised}
          raised={this.state.isCardRaised}
        >
          <CardContent className={classes.cardContent}>
            <Link
              component={this.createLinkForPlaylist(playlist.id)}
              style={{ textDecoration: "none" }}
              color="inherit"
            >
              <Typography gutterBottom variant="h5" component="h2">
                {formatPhrase(playlist.name)}
              </Typography>
            </Link>

            <Typography>
              {`Made by: ${formatName(playlist.user.username)}`}
            </Typography>
            {isAuthenticated ? (
              <Grid
                container
                spacing={24}
                justify="center"
                className={classes.margin5}
              >
                <Grid item>
                  <Link
                    component={this.createLinkForPlaylist(playlist.id)}
                    style={{ textDecoration: "none" }}
                    color="inherit"
                  >
                    <Tooltip title="View playlist" aria-label="View playlist">
                      <IconButton
                        aria-label="View playlist"
                        className={classes.secondaryIcon}
                      >
                        <OpenInBrowserIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Grid>
                <Grid item>
                  <Tooltip title={tooltipText} aria-label={tooltipText}>
                    <IconButton
                      aria-label={tooltipText}
                      onClick={() => this.handleFavoriteButtonClick(playlist)}
                      className={classes.secondaryIcon}
                    >
                      {isFavorite ? <FavoriteIconFilled /> : <FavoriteIcon />}
                    </IconButton>
                  </Tooltip>
                </Grid>
                {user.id === playlist.user.id ? (
                  <Grid item>
                    <Tooltip
                      title="Delete playlist"
                      aria-label="Delete playlist"
                    >
                      <IconButton
                        aria-label="Delete playlist"
                        onClick={e => {
                          this.handelDeletePlaylist(playlist, e);
                        }}
                        className={classes.secondaryIcon}
                      >
                        <DeleteIconFilled />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : null}

                <Grid item>
                  <Tooltip title="Play playlist" aria-label="Play playlist">
                    <IconButton
                      aria-label="Play playlist"
                      onClick={() =>
                        this.handelPlayPlaylistClick(playlist.songs)
                      }
                      className={classes.secondaryIcon}
                    >
                      <PlayIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : null}
          </CardContent>
        </Card>
      )
    );
  }
}

PlaylistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  {
    addPlaylistFavorite,
    deletePlaylist,
    removePlaylistFromFavorite,
    playGroupOfSongs
  }
)(withStyles(styles, { withTheme: true })(PlaylistCard));
