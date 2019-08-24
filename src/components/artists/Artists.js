import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import PageTitle from "../common/PageTitle";
import { loadArtists } from "../../actions/artists";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import ArtistCard from "./ArtistCard";
//import Tooltip from "@material-ui/core/Tooltip"; // for later to have better affordance

const pageTitle = "Artists";
const pageSubtitle = "Most famous artists in our platform";

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

export class Artists extends React.Component {
  componentWillMount() {
    this.props.loadArtists();
  }

  render() {
    const { classes, artists, isArtistsLoading, isDrawerOpen } = this.props;

    if (isArtistsLoading) {
      return <Preloader />;
    } else {
      if (artists === null) {
        return (
          <Error message="Something went wrong when trying to load artists" />
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
                {artists.map(artist => (
                  <Grid
                    item
                    key={artist.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={4}
                  >
                    <ArtistCard artist={artist} />
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

Artists.propTypes = {
  classes: PropTypes.object.isRequired,
  artists: PropTypes.array.isRequired,
  isArtistsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  artists: state.artists.artists,
  isArtistsLoading: state.artists.isLoading,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  { loadArtists }
)(withStyles(styles, { withTheme: true })(Artists));
