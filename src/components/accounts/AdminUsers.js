import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classNames from "classnames";
import PageTitle from "../common/PageTitle";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import { loadUsers, loadUsersRoles } from "../../actions/admin";
import List from "@material-ui/core/List";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import UserListItem from "./UserListItem";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

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
    margin: "2%",
    width: "30%"
  },
  body: {
    paddingRight: "3.5%"
  },
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  },
  search: {
    backgroundColor: "white",
    backgroundRepeat: "no-repeat",
    borderRadius: "15px",
    paddingLeft: "1%",
    marginBottom: "1%"
  }
});

export class AdminUsers extends React.Component {
  componentDidMount() {
    this.props.user &&
      this.props.user.type === "admin" &&
      this.props.loadUsers();
    this.props.loadUsersRoles();
  }

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }

  search = event => {
    let users = this.refs;

    for (let user in users) {
      console.log(this.refs[user].classList);

      if (user.includes(event.target.value)) {
        this.refs[user].className = this.props.classes.show;
      } else {
        this.refs[user].className = this.props.classes.hide;
      }
    }
  };

  render() {
    const linkAdmin = props => <RouterLink to="/admin" {...props} />;

    const { isDrawerOpen, user, isAuthenticated, classes, users } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome admin brother RESPECT!!";

    if (!users) {
      return <Preloader />;
    } else {
      console.log(users);
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
                style={{ width: "100%" }}
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
                  </center>
                  <h1>Users</h1>
                  <input
                    className={classes.search}
                    onChange={this.search}
                    type="text"
                    name="searchUsers"
                    placeholder="Search..."
                  />
                  <center>
                    <List style={{ width: "100%" }} className={classes.root}>
                      {users.map(appUser => {
                        if (appUser.id !== user.id)
                          return (
                            <div key={appUser.username} ref={appUser.username}>
                              <UserListItem key={appUser.id} user={appUser} />
                            </div>
                          );
                        else return null;
                      })}
                    </List>
                  </center>
                </div>
              </div>
            </div>
          );
        }
      }
    }
  }
}

AdminUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  users: state.admin.users,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    loadUsers,
    loadUsersRoles
  }
)(withStyles(styles, { withTheme: true })(withRouter(AdminUsers)));
