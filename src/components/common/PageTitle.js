import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 2
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
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
  }
});

export const PageTitle = props => {
  const { classes, isDrawerOpen, title, subtitle } = props;
  return (
    <div
      className={classNames(
        classes.heroUnit,
        {
          [classes.shiftForDrawerOpen]: isDrawerOpen
        },
        {
          [classes.shiftForDrawerClosed]: !isDrawerOpen
        }
      )}
    >
      <div className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          {subtitle}
        </Typography>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(PageTitle);
