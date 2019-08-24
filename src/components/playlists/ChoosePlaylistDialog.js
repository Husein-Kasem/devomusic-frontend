import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import {
  closeChoosePlaylistDialog,
  loadUserPlaylists,
  addSongToPlaylist
} from "../../actions/playlists";

import { connect } from "react-redux";
import { TransitionUp } from "../common/Transitions";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 150
  }
});

class ChoosePlaylistDialog extends React.Component {
  state = {
    chosenPlaylist: {},
    isChosenPlaylist: false
  };

  handleClose = () => {
    this.props.closeChoosePlaylistDialog();
  };

  handelAdd = () => {
    this.props.addSongToPlaylist(
      this.state.chosenPlaylist.id,
      this.props.chosenSong.id
    );
    this.props.closeChoosePlaylistDialog();
  };

  handleChosenPlaylist = event => {
    this.setState({
      chosenPlaylist: event.target.value,
      isChosenPlaylist: true
    });
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isAuthenticated !== this.props.isAuthenticated &&
      this.props.isAuthenticated === true
    ) {
      this.props.loadUserPlaylists();
    }
  }

  render() {
    const {
      classes,
      isDialogOpen,
      playlists,
      isPlaylistLoading,
      isAuthenticated
    } = this.props;
    return !isPlaylistLoading && playlists && isAuthenticated ? (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="sm"
          open={isDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="choose-playlist-dialog-title"
          TransitionComponent={TransitionUp}
        >
          <DialogTitle id="choose-playlist-dialog-title">
            Choose playlist
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please choose the playlist you want to add the song(s) to.
            </DialogContentText>
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="choosePlaylist">
                  Choose playlist
                </InputLabel>
                <Select
                  onChange={this.handleChosenPlaylist}
                  value={this.state.chosenPlaylist}
                  inputProps={{
                    name: this.state.chosenPlaylistName,
                    id: "choosePlaylist",
                    chosenPlaylist: this.state.chosenPlaylistName
                  }}
                >
                  {playlists.length > 0 &&
                    playlists.map(playlist => (
                      <MenuItem item value={playlist} key={playlist.id}>
                        {playlist.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={this.handelAdd}
              disabled={!this.state.isChosenPlaylist}
              color="primary"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    ) : null;
  }
}

ChoosePlaylistDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isDialogOpen: state.playlists.isChoosePlaylistDialogOpen,
  playlists: state.playlists.userPlaylists,
  chosenSong: state.playlists.chosenSong,
  isPlaylistLoading: state.playlists.isUserPlaylistsLoading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { closeChoosePlaylistDialog, loadUserPlaylists, addSongToPlaylist }
)(withStyles(styles, { withTheme: true })(ChoosePlaylistDialog));
