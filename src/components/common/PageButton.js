import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  text: {
    margin: "5%",
    padding: "3%"
  }
});

const PageButton = ({ classes, text, styles, onClickFunction }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={onClickFunction}
      className={styles ? styles : classes.text}
      fullWidth
    >
      {text}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(PageButton);
