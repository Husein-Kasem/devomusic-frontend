import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FavoriteIcon from "@material-ui/icons/StarBorder";
import FavoriteIconFilled from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { playSong, stopSong, pauseSong } from "../../actions/musicPlayer";
import {
  addSongFavorite,
  removeSongFromFavorite
} from "../../actions/favorites";
import { openChoosePlaylistDialog } from "../../actions/playlists";
import { formatPhrase, formatName } from "../../utils";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  card: {
    display: "flex",
    height: "100%"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    flexGrow: 5
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    marginRight: "0px",
    width: "20%",
    flexGrow: 3
  },
  controls: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.unit
  },
  playIcon: {
    //flexGrow: 2
    // top: "50%",
    // left: "50%"
  },
  secondaryIcon: {
    flexGrow: 2
    // top: "50%",
    // left: "50%"
  }
});
class SongCard extends React.Component {
  // a state to animate the cards
  state = {
    isCardRaised: false,
    iconFontSize: "small"
  };
  toggleRaised = () => {
    this.setState({ isCardRaised: !this.state.isCardRaised });
  };
  toggleButtonSize = () => {
    this.setState({
      iconFontSize: this.state.iconFontSize === "small" ? "large" : "small"
    });
  };

  updateIsPlayingState() {}

  handleFavoriteButtonClick(song) {
    if (this.props.isFavorite) {
      this.props.removeSongFromFavorite(song);
    } else {
      this.props.addSongFavorite(song);
    }
  }

  togglePlay = () => {
    const { song, isMusicPlaying, playingSong } = this.props;
    if (isMusicPlaying && playingSong.id === song.id) {
      this.stop();
    } else {
      this.play();
    }
  };
  play = () => {
    this.props.playSong(this.props.song, this.props.user);
  };
  stop = () => {
    this.props.pauseSong();
  };
  getListOfFeaturing(song) {
    let featString = "";
    let first = true;
    song.featuring &&
      song.featuring.forEach(feat => {
        if (!first) {
          featString += ", ";
        } else {
          featString += "Featuring: ";
          first = false;
        }
        featString += feat.name;
      });
    return featString;
  }
  render() {
    const {
      classes,
      /*theme,*/ song,
      isMusicPlaying,
      playingSong,
      isAuthenticated,
      isFavorite
    } = this.props;

    const tooltipText = isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

    return (
      <Card
        className={classes.card}
        onMouseEnter={this.toggleRaised}
        onMouseLeave={this.toggleRaised}
        raised={this.state.isCardRaised}
      >
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5" noWrap={true}>
              {formatPhrase(song.name)}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap={true}>
              {formatPhrase(song.description)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" noWrap={true}>
              {formatName(this.getListOfFeaturing(song))}
            </Typography>
            {isAuthenticated ? (
              <Grid container spacing={24} justify="center">
                <Grid item>
                  <Tooltip title={tooltipText} aria-label={tooltipText}>
                    <IconButton
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      onClick={() => this.handleFavoriteButtonClick(song)}
                      className={classes.secondaryIcon}
                    >
                      {isFavorite ? <FavoriteIconFilled /> : <FavoriteIcon />}
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Add to playlist" aria-label="Add to playlist">
                    <IconButton
                      aria-label="Add to playlist"
                      onClick={() => this.props.openChoosePlaylistDialog(song)}
                      className={classes.secondaryIcon}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ) : null}
          </CardContent>
        </div>
        <div className={classes.controls}>
          <Tooltip
            title={
              isMusicPlaying && playingSong.id === song.id ? "Pause" : "Play"
            }
            aria-label={
              isMusicPlaying && playingSong.id === song.id ? "Pause" : "Play"
            }
          >
            <IconButton
              aria-label="Play/pause"
              onMouseEnter={this.toggleButtonSize}
              onMouseLeave={this.toggleButtonSize}
              onClick={this.togglePlay}
              className={classes.playIcon}
            >
              {isMusicPlaying && playingSong.id === song.id ? (
                <PauseIcon fontSize={this.state.iconFontSize} />
              ) : (
                <PlayIcon fontSize={this.state.iconFontSize} />
              )}
            </IconButton>
          </Tooltip>
        </div>
        <CardMedia
          className={classes.cover}
          image={
            song.artist.image
              ? song.artist.image
              : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
          }
          title={song.artist.name}
        />
      </Card>
    );
  }
}
SongCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  song: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  playingSong: state.musicPlayer.playingSong,
  isMusicPlaying: state.musicPlayer.isPlaying,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  {
    playSong,
    stopSong,
    pauseSong,
    addSongFavorite,
    openChoosePlaylistDialog,
    removeSongFromFavorite
  }
)(withStyles(styles, { withTheme: true })(SongCard));
