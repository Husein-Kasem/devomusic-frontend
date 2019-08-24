import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "../../constants";
import classNames from "classnames";
import React from "react";

const drawerWidth = DRAWER_WIDTH;
const headerHeight = HEADER_HEIGHT;

const styles = theme => ({
  shiftForDrawerOpen: {
    paddingLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 20}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  shiftForDrawerClosed: {
    paddingLeft: drawerWidth / 3,
    width: `calc(100% - ${30}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: `${headerHeight}px`,
    height: `calc(100vh - ${headerHeight}px)`,
    overflow: "auto"
  }
});

const Container = props => ({ classes, isDrawerOpen, ...rest }) => (
  <Grid
    {...rest}
    container
    className={classNames(
      classes.content,
      {
        [classes.shiftForDrawerOpen]: isDrawerOpen
      },
      {
        [classes.shiftForDrawerClosed]: !isDrawerOpen
      }
    )}
  >
    {props.childeren.forEach(Component => {
      return <Component />;
    })}
  </Grid>
);

const mapStateToProps = state => ({
  isDrawerOpen: state.drawer.isDrawerOpen
});
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(Container)
);
