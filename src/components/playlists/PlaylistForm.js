import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPlaylist } from "../../actions/playlists";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { returnErrors } from "../../actions/messages";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    backgroundColor: "#ffffff",
    margin: theme.spacing.unit * 3,
    width: "100px",
    height: "100px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  marTop: {
    marginTop: theme.spacing.unit * 3
  }
});

class PlaylistForm extends React.Component {
  state = {
    name: ""
  };

  onSubmit = e => {
    e.preventDefault();
    const { user, returnErrors, addPlaylist } = this.props;

    this.state.name.trim() === ""
      ? returnErrors("The name of the playlist can't be empty", "")
      : user && user.id
      ? addPlaylist(this.state.name, this.props.user.id)
      : returnErrors("You have to be loged in to create a playlist", "");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const name = this.state.name;
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create a new playlist
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Playlist name</InputLabel>
              <Input
                name="name"
                value={name}
                autoComplete="name"
                autoFocus
                onChange={this.onChange}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.marTop}
            >
              Create playlist
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

PlaylistForm.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  addPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addPlaylist, returnErrors }
)(withStyles(styles)(PlaylistForm));
