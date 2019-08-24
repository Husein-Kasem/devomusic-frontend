import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classNames from "classnames";
import PageTitle from "../common/PageTitle";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import { loadHomeAlbums } from "../../actions/albums";
import { loadHomeSongs } from "../../actions/songs";
import { formatPhrase } from "../../utils";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Grid from "@material-ui/core/Grid";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const albumSize = 7;
const songSize = 7;

var albumSteps = [
  {
    label: "Error",
    imgPath: ""
  }
];

var songSteps = [
  {
    label: "Error",
    imgPath: ""
  }
];

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
    padding: `${theme.spacing.unit * 2}px`
  },
  root: {
    //maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: `calc(${window.innerHeight - 350}px)`,
    display: "block",
    //maxWidth: 400,
    overflow: "hidden",
    width: "100%"
  },
  mobileStepper: {
    height: "20%"
  }
});

export class Home extends React.Component {
  state = {
    albumActiveStep: 0,
    songActiveStep: 0
  };

  handleNextAlbum = () => {
    this.setState(prevState => ({
      albumActiveStep: prevState.albumActiveStep + 1
    }));
  };

  handleBackAlbum = () => {
    this.setState(prevState => ({
      albumActiveStep: prevState.albumActiveStep - 1
    }));
  };

  handleStepChangeAlbum = albumActiveStep => {
    this.setState({ albumActiveStep });
  };

  handleNextSong = () => {
    this.setState(prevState => ({
      songActiveStep: prevState.songActiveStep + 1
    }));
  };

  handleBackSong = () => {
    this.setState(prevState => ({
      songActiveStep: prevState.songActiveStep - 1
    }));
  };

  handleStepChangeSong = songActiveStep => {
    this.setState({ songActiveStep });
  };

  componentDidMount() {
    this.props.loadHomeAlbums(albumSize);
    this.props.loadHomeSongs(songSize);
  }

  componentWillReceiveProps(nextProps) {
    if (
      albumSteps.length < albumSize &&
      nextProps.albums &&
      nextProps.albums.length > 0
    ) {
      let ts = [];

      nextProps.albums.forEach(album => {
        ts.push({ label: formatPhrase(album.name), imgPath: album.image });
      });

      albumSteps = ts;
    }

    if (
      songSteps.length < songSize &&
      nextProps.songs &&
      nextProps.songs.length > 0
    ) {
      let ts = [];

      nextProps.songs.forEach(song => {
        ts.push({ label: formatPhrase(song.name), imgPath: song.artist.image });
      });

      songSteps = ts;
    }
  }

  render() {
    const {
      isDrawerOpen,
      classes,
      isAlbumsLoading,
      isSongsLoading,
      albums,
      songs,
      theme
    } = this.props;

    const { albumActiveStep, songActiveStep } = this.state;
    const maxAlbumSteps = albumSteps.length;
    const maxSongSteps = songSteps.length;

    const pageTitle = "Home";
    const pageSubtitle = "Welcome brother";

    if (isAlbumsLoading || isSongsLoading) {
      return <Preloader />;
    } else {
      if (!albums || !songs) {
        return (
          <Error message="Something went wrong when trying to load the home page" />
        );
      } else {
        return (
          <div className="container">
            <PageTitle
              isDrawerOpen={isDrawerOpen}
              title={pageTitle}
              subtitle={pageSubtitle}
            />
            <Grid
              container
              className={classNames(
                {
                  [classes.shiftForDrawerOpen]: isDrawerOpen
                },
                {
                  [classes.shiftForDrawerClosed]: !isDrawerOpen
                }
              )}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.cardGrid}
              >
                <Typography align="center" variant="h4">
                  Albums
                </Typography>

                <div className={classes.root}>
                  <Paper square elevation={0} className={classes.header}>
                    <Typography align="center">
                      {albumSteps[albumActiveStep].label}
                    </Typography>
                  </Paper>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={albumActiveStep}
                    onChangeIndex={this.handleStepChangeAlbum}
                    enableMouseEvents
                  >
                    {albumSteps.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(albumActiveStep - index) <= 2 ? (
                          <img
                            className={classes.img}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxAlbumSteps}
                    position="static"
                    activeStep={albumActiveStep}
                    className={classes.mobileStepper}
                    nextButton={
                      <Button
                        size="small"
                        onClick={this.handleNextAlbum}
                        disabled={albumActiveStep === maxAlbumSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={this.handleBackAlbum}
                        disabled={albumActiveStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                className={classes.cardGrid}
              >
                <Typography align="center" variant="h4">
                  Songs
                </Typography>
                <div className={classes.root}>
                  <Paper square elevation={0} className={classes.header}>
                    <Typography align="center">
                      {songSteps[songActiveStep].label}
                    </Typography>
                  </Paper>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={songActiveStep}
                    onChangeIndex={this.handleStepChangeSong}
                    enableMouseEvents
                  >
                    {songSteps.map((step, index) => (
                      <div key={step.label}>
                        {Math.abs(songActiveStep - index) <= 2 ? (
                          <img
                            className={classes.img}
                            src={step.imgPath}
                            alt={step.label}
                          />
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSongSteps}
                    position="static"
                    activeStep={songActiveStep}
                    className={classes.mobileStepper}
                    nextButton={
                      <Button
                        size="small"
                        onClick={this.handleNextSong}
                        disabled={songActiveStep === maxSongSteps - 1}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={this.handleBackSong}
                        disabled={songActiveStep === 0}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        );
      }
    }
  }
}

//<p width="100%" style={{position:"absolute", top:"88%", textAlign:"center", backgroundColor: "#B0C4DE", opacity: "0.5"}} onClick={()=>alert(index)}>{formatName(album.name)}</p>

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  isAlbumsLoading: PropTypes.bool.isRequired,
  isSongsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  albums: state.albums.homeAlbums,
  songs: state.songs.homeSongs,
  isSongsLoading: state.songs.isHomeLoading,
  isAlbumsLoading: state.albums.isHomeLoading
});

export default connect(
  mapStateToProps,
  {
    loadHomeAlbums,
    loadHomeSongs
  }
)(withStyles(styles, { withTheme: true })(withRouter(Home)));
