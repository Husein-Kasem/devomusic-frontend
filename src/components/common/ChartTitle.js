import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  text: {
    margin: "5%",
    padding: "3%"
  }
});

const ChartTitle = ({ classes, text, styles }) => {
  return (
    <div>
      <Typography
        noWrap={true}
        variant="h4"
        align="center"
        className={styles ? styles : classes.text}
      >
        {text}
      </Typography>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ChartTitle);
