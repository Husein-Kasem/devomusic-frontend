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
import MonthInscriptionChart from "./MonthInscriptionChart";
import YearInscriptionChart from "./YearInscriptionChart";
import {
  loadInscriptionsByMonth,
  loadInscriptionsByYear
} from "../../actions/statistics";

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
    width: "74%",
  },
  body: {
    paddingRight: "3.5%"
  },
  buttonYear: {
    margin: "2%",
    width: "35%",
  }
});

export class AdminStatistics extends React.Component {
  state = {
    year: new Date().getFullYear(),
    currentYear: new Date().getFullYear()
  };

  componentDidMount() {
    this.props.loadInscriptionsByMonth(this.state.currentYear);
    this.props.loadInscriptionsByYear(
      this.state.currentYear - 5,
      this.state.currentYear
    );
  }

  returnPreloader() {
    return <Preloader />;
  }

  returnUnauthorized() {
    return <Error message="Unauthorized" />;
  }
  renderMonthChart(data, year) {
    return <MonthInscriptionChart chartData={data} year={year} />;
  }

  renderYearChart(data, yearStart, yearEnd) {
    return (
      <YearInscriptionChart
        chartData={data}
        yearStart={yearStart}
        yearEnd={yearEnd}
      />
    );
  }

  prevYear() {
    this.props.loadInscriptionsByMonth(this.state.year - 1);
    this.setState({ year: this.state.year - 1 });
  }

  nextYear() {
    this.props.loadInscriptionsByMonth(this.state.year + 1);
    this.setState({ year: this.state.year + 1 });
  }

  render() {
    const linkStats = props => <RouterLink to="/admin/stats" {...props} />;

    const {
      classes,
      isDrawerOpen,
      user,
      isAuthenticated,
      monthStats,
      isinscriptionsByMonthLoading,
      yearStats,
      isinscriptionsByYearLoading
    } = this.props;

    const pageTitle = "Admin";
    const pageSubtitle = "Welcome admin brother RESPECT!!";

    if (!isAuthenticated) {
      return this.returnUnauthorized();
    } else {
      if (user.type !== "admin") {
        return <Error message="Unauthorized" />;
      } else {
        if (
          !monthStats ||
          monthStats === undefined ||
          monthStats === null ||
          monthStats.length < 12 ||
          isinscriptionsByMonthLoading ||
          !yearStats ||
          yearStats === undefined ||
          yearStats === null ||
          isinscriptionsByYearLoading
        ) {
          return <Preloader />;
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
                    <Link component={linkStats}>
                      <Button className={classes.button} variant="contained">Back</Button>
                    </Link>

                    <Button className={classes.buttonYear} onClick={() => this.prevYear()} variant="contained" color="primary">
                      Previous year
                    </Button>
                    <Button className={classes.buttonYear} onClick={() => this.nextYear()} variant="contained" color="primary">
                      Next year
                    </Button>
                    {console.log(monthStats)}
                    {this.renderMonthChart(monthStats, this.state.year)}

                    {this.renderYearChart(
                      yearStats,
                      this.state.year - 5,
                      this.state.year
                    )}
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

AdminStatistics.propTypes = {
  classes: PropTypes.object.isRequired,
  isInscriptionsByMonthLoading: PropTypes.bool.isRequired,
  isinscriptionsByYearLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  monthStats: state.statistics.inscriptionsByMonth,
  isInscriptionsByMonthLoading: state.statistics.isInscriptionsByMonthLoading,
  yearStats: state.statistics.inscriptionsByYear,
  isinscriptionsByYearLoading: state.statistics.isInscriptionsByYearLoading
});

export default connect(
  mapStateToProps,
  {
    loadInscriptionsByMonth,
    loadInscriptionsByYear
  }
)(withStyles(styles, { withTheme: true })(withRouter(AdminStatistics)));
