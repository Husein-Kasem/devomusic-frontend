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
import { loadUserPlaylists } from "../../actions/playlists";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import AddPlayListDialog from "./AddPlaylistDialog";

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
  },

  dialogOpenButton: {
    marginTop: theme.spacing.unit * 3
    // width: "50%",
    // margin: "9% 50%",
    // top: "10%",
    // left: "15%",
    // position: "relative"
  }
});

export class UserPlaylists extends React.Component {
  componentWillMount() {
    this.props.loadUserPlaylists(this.props.userId);
  }

  render() {
    const { classes, playlists, isPlaylistLoading, isDrawerOpen } = this.props;

    if (isPlaylistLoading) {
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
                {playlists.map(playlist => (
                  <Grid
                    item
                    key={playlist.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2}
                  >
                    <PlaylistCard playlist={playlist} />
                  </Grid>
                ))}
              </Grid>

              <AddPlayListDialog
                dialogOpenButtonStyles={classes.dialogOpenButton}
              />
            </div>
          </div>
        );
      }
    }
  }
}

UserPlaylists.propTypes = {
  classes: PropTypes.object.isRequired,
  playlists: PropTypes.array,
  isPlaylistLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  playlists: state.playlists.userPlaylists,
  isPlaylistLoading: state.playlists.isUserPlaylistsLoading,
  userId: state.auth.user.id,
  isDrawerOpen: state.drawer.isDrawerOpen
});

export default connect(
  mapStateToProps,
  { loadUserPlaylists }
)(withStyles(styles, { withTheme: true })(UserPlaylists));
