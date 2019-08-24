import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PageTitle from "../common/PageTitle";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import classNames from "classnames";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

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

  button: {
    marginTop: "2%",
    width: "90%",
    margin: theme.spacing.unit
  },
  body: {
    paddingRight: "3.5%"
  }
});

export class AdminStatistics extends React.Component {
  componentDidMount() {}

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }

  render() {
    const linkAdmin = props => <RouterLink to="/admin" {...props} />;
    const linkInscription = props => (
      <RouterLink to="/admin/stats/inscription" {...props} />
    );
    const linkTarget = props => (
      <RouterLink to="/admin/stats/target" {...props} />
    );
    const linkMusic = props => (
      <RouterLink to="/admin/stats/music" {...props} />
    );

    const { isDrawerOpen, user, isAuthenticated, classes } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome admin brother RESPECT!!";

    if (!isAuthenticated) {
      return this.returnUnauthorized();
    } else {
      if (user.type !== "admin") {
        return <Error message="Unauthorized" />;
      } else {
        return (
          <div className="container">
            <div>
              <PageTitle
                isDrawerOpen={isDrawerOpen}
                title={pageTitle}
                subtitle={pageSubtitle}
              />
            </div>
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
              <div className={classes.body}>
                <center>
                  <Link component={linkAdmin}>
                    <Button className={classes.button} variant="contained">
                      Back
                    </Button>
                  </Link>
                  <Link component={linkInscription}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Inscription Statistics
                    </Button>
                  </Link>
                  <Link component={linkTarget}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Target audience
                    </Button>
                  </Link>
                  <Link component={linkMusic}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Music Statistics
                    </Button>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

AdminStatistics.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles, { withTheme: true })(withRouter(AdminStatistics)));
