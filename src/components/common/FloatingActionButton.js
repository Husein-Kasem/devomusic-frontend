import React from "react";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  }
});

const FloatingActionButton = props => {
  const { className, color, icon, classes, clickHandler } = props;
  return (
    <Fab
      className={classNames(classes.fab, className)}
      onClick={clickHandler}
      color={color}
    >
      {icon}
    </Fab>
  );
};

export default withStyles(styles, { withTheme: true })(FloatingActionButton);
