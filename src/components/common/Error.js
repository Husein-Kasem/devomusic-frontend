import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxWidth: 600,
    margin: "10% auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  }
});

const Error = props => {
  const { classes, message } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography
          variant="h5"
          component="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Something went wrong.
        </Typography>
        <Typography
          component="p"
          align="center"
          color="textSecondary"
          gutterBottom
        >
          {message ? message : "Please try again later"}
        </Typography>
      </Paper>
    </div>
  );
};

Error.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string
};

export default withStyles(styles)(Error);
