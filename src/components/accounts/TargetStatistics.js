import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import classNames from "classnames";
import PageTitle from "../common/PageTitle";
import Preloader from "../common/Preloader";
import Error from "../common/Error";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import GenderChart from "./GenderChart";
import { loadGenderStatistics, loadRoleStatistics, loadAgeStatistics, loadCountryStatistics } from "../../actions/statistics"
import RoleChart from "./RoleChart";
import AgeChart from "./AgeChart";
import CountryChart from "./CountryChart";
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
    width: "30%",
  },
  body: {
    paddingRight: "3.5%"
  }
});

export class TargetStatistics extends React.Component {
  componentDidMount() {
    this.props.loadGenderStatistics();
    this.props.loadRoleStatistics();
    this.props.loadAgeStatistics();
    this.props.loadCountryStatistics();
  }

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }

  render() {
    const linkStats = props => <RouterLink to="/admin/stats" {...props} />;

    const {
      classes,
      isDrawerOpen,
      user,
      isAuthenticated,
      genderStats,
      isGenderLoading,
      isRoleLoading,
      roleStats,
      isAgeLoading,
      ageStats,
      isCountryLoading,
      countryStats
    } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome admin brother RESPECT!!";

    if (!isAuthenticated) {
      return this.returnUnauthorized();
    } else {
    if (user.type !== "admin") {
        return (
        <Error message="Unauthorized" /> 
        );
    } else {
        if(!genderStats || genderStats ===undefined || genderStats === null || genderStats.length < 1 || isGenderLoading || !roleStats || roleStats ===undefined || roleStats === null || roleStats.length < 1 || isRoleLoading || !ageStats || ageStats ===undefined || ageStats === null || ageStats.length < 1 || isAgeLoading || !countryStats || countryStats ===undefined || countryStats === null || countryStats.length < 1 || isCountryLoading ){
          return <Preloader/>
        }
        else{
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
                    <Link component={linkStats}>
                      <Button className={classes.button} variant="contained">Back</Button>
                    </Link>

                    <GenderChart chartData={genderStats}/>
                    <RoleChart chartData={roleStats}/>
                    <AgeChart chartData={ageStats}/>
                    <CountryChart chartData={countryStats}/>
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

TargetStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  isGenderLoading: PropTypes.bool.isRequired,
  isRoleLoading: PropTypes.bool.isRequired,
  isAgeLoading: PropTypes.bool.isRequired,
  isCountryLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  genderStats: state.statistics.genderStats,
  isGenderLoading: state.statistics.isGenderLoading,
  roleStats: state.statistics.roleStats,
  isRoleLoading: state.statistics.isRoleLoading,
  ageStats: state.statistics.ageStats,
  isAgeLoading: state.statistics.isAgeLoading,
  countryStats: state.statistics.countryStats,
  isCountryLoading: state.statistics.isCountryLoading,
});

export default connect(
  mapStateToProps,
  {
    loadGenderStatistics,
    loadRoleStatistics,
    loadAgeStatistics,
    loadCountryStatistics
  }
)(withStyles(styles, { withTheme: true })(withRouter(TargetStatistics)));
