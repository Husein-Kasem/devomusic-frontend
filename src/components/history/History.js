import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadSongsHistory } from "../../actions/history";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import SongCard from "../songs/SongCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

// this could be placed in render so it can be chenged dynamically
//History component for the history page
const pageTitle = "History";
const pageSubtitle = "Your song history";

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

export class History extends React.Component {
  componentDidMount() {
    this.props.loadSongsHistory();
  }

  render() {
    const {
      classes,
      /*theme,*/ songs,
      isSongsLoading,
      isDrawerOpen
    } = this.props;

    if (isSongsLoading) {
      return <Preloader />;
    } else {
      if (songs === null) {
        return (
          <Error message="Something went wrong when trying to load songs history" />
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
                {songs.map(song => (
                  <Grid item key={song.id} xs={6} sm={6} md={6} lg={6} xl={6}>
                    <SongCard song={song} />
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

History.propTypes = {
  classes: PropTypes.object.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  songs: PropTypes.array
};

const mapStateToProps = state => ({
  songs: state.history.data,
  isSongsLoading: state.history.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen,
  userId: state.auth.user.id,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { loadSongsHistory }
)(withStyles(styles, { withTheme: true })(History));
