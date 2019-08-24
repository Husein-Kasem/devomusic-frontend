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
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`,
    width: "100%"
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  button: {
    marginTop: "2%",
    width: "90%"
  },
  body: {
    paddingRight: "3.5%"
  }
});

export class Admin extends React.Component {
  componentDidMount() {}

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }

  render() {
    const linkAdminUsers = props => <RouterLink to="/admin/users" {...props} />;
    const linkAdminStats = props => <RouterLink to="/admin/stats" {...props} />;

    const { isDrawerOpen, user, isAuthenticated, classes } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome to the admin page";

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

              //style={{display: "block",  justifyContent:'center', alignItems:'center'}}
            >
              <div className={classes.body}>
                <center>
                  <Link component={linkAdminUsers}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Users
                    </Button>
                  </Link>
                  <Link component={linkAdminStats}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                    >
                      Statistics
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

Admin.propTypes = {
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
)(withStyles(styles, { withTheme: true })(withRouter(Admin)));
