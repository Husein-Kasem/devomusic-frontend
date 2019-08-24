import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    //margin: theme.spacing.unit * 2,
    margin: "20% 45%"
  }
});

function Preloader(props) {
  const { classes, size } = props;
  return (
    <CircularProgress
      className={classes.progress}
      size={size ? size : 70}
      color="primary"
    />
  );
}

Preloader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Preloader);
