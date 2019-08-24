import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { addPlaylist } from "../../actions/playlists";
import { returnErrors } from "../../actions/messages";
import { TransitionUp } from "../common/Transitions";

const styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class AddPlaylistDialog extends React.Component {
  state = {
    open: false,
    playlistName: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleClose = () => {
    this.setState({ open: false });
  };

  addPlaylist = () => {
    !this.props.isAuthenticated
      ? this.props.returnErrors(
          "Please sign in to be able to add playlists to your account",
          ""
        )
      : this.props.addPlaylist(this.state.playlistName);
    this.handleClose();
  };

  render() {
    const { classes, dialogOpenButtonStyles } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={dialogOpenButtonStyles}
          fullWidth
        >
          <AddIcon className={classes.extendedIcon} />
          Add playlist
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="playlist-dialog-title"
          TransitionComponent={TransitionUp}
        >
          <DialogTitle id="playlist-dialog-title">New playlist</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please type the name of the new playlist and click on add
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="playlistName"
              name="playlistName"
              label="New playlist name"
              type="text"
              fullWidth
              required
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addPlaylist} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AddPlaylistDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  addPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addPlaylist, returnErrors }
)(withStyles(styles)(AddPlaylistDialog));
