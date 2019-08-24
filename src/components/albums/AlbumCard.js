import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { formatName } from "../../utils";
import { connect } from "react-redux";
import PlayIcon from "@material-ui/icons/PlayArrow";
import { playGroupOfSongs, stopSong } from "../../actions/musicPlayer";
import {
  addAlbumFavorite,
  removeAlbumFromFavorite
} from "../../actions/favorites";

import FavoriteIcon from "@material-ui/icons/StarBorder";
import FavoriteIconFilled from "@material-ui/icons/Star";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";

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
  }
});

class AlbumCard extends React.Component {
  // a state to animate the cards
  state = {
    isCardRaised: false
  };

  toggleRaised = () => {
    this.setState({ isCardRaised: !this.state.isCardRaised });
  };

  getGenreStringFromArray = genres => {
    let GenreInString = "";
    genres.forEach(genre => {
      GenreInString += genre.name + " ";
    });
    return GenreInString;
  };

  createLinkForAlbum(albumId) {
    return props => {
      return <RouterLink to={`/albumsongs/${albumId}`} {...props} />;
    };
  }

  handelPlayAlbumClick(songs) {
    this.props.playGroupOfSongs(songs);
  }

  createLinkForArtistDetails(artistId) {
    return props => {
      return <RouterLink to={`/artistdetail/${artistId}`} {...props} />;
    };
  }
  handleFavoriteButtonClick(album) {
    if (this.props.isFavorite) {
      this.props.removeAlbumFromFavorite(album);
    } else {
      this.props.addAlbumFavorite(album);
    }
  }

  render() {
    const { classes, album, isAuthenticated, isFavorite } = this.props;
    const tooltipText = isFavorite
      ? "Remove from favorites"
      : "Add to favorites";

    return (
      album && (
        <Card
          className={classes.card}
          onMouseEnter={this.toggleRaised}
          onMouseLeave={this.toggleRaised}
          raised={this.state.isCardRaised}
        >
          <Link
            component={this.createLinkForAlbum(album.id)}
            style={{ textDecoration: "none" }}
            color="inherit"
          >
            <CardMedia
              className={classes.cardMedia}
              image={
                album.image
                  ? album.image
                  : "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              } // eslint-disable-line max-len
              title={album.name}
            />
          </Link>
          <CardContent className={classes.cardContent}>
            <Link
              component={this.createLinkForAlbum(album.id)}
              style={{ textDecoration: "none" }}
              color="inherit"
            >
              <Typography gutterBottom variant="h5" component="h2">
                {formatName(album.name)}
              </Typography>
            </Link>
            <Link component={this.createLinkForArtistDetails(album.artist.id)}>
              <Typography>{formatName(album.artist.name)}</Typography>
            </Link>

            <Typography noWrap={true}>
              {`Genre: ${formatName(
                this.getGenreStringFromArray(album.genres)
              )}`}
            </Typography>
            {isAuthenticated ? (
              <Grid container spacing={24} justify="center">
                <Grid item>
                  <Link
                    component={this.createLinkForAlbum(album.id)}
                    style={{ textDecoration: "none" }}
                    color="inherit"
                  >
                    <Tooltip title="View album" aria-label="View album">
                      <IconButton
                        aria-label="View album"
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
                      onClick={() => this.handleFavoriteButtonClick(album)}
                      className={classes.secondaryIcon}
                    >
                      {isFavorite ? <FavoriteIconFilled /> : <FavoriteIcon />}
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Play album" aria-label="Play album">
                    <IconButton
                      aria-label="Play album"
                      onClick={() => this.handelPlayAlbumClick(album.songs)}
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

AlbumCard.propTypes = {
  classes: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { addAlbumFavorite, removeAlbumFromFavorite, playGroupOfSongs, stopSong }
)(withStyles(styles, { withTheme: true })(AlbumCard));
