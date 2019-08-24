import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PageTitle from "../common/PageTitle";
//import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import { getCount } from "../../actions/songs";
import TextField from "@material-ui/core/TextField";
import {
  changePassword,
  changeUsername,
  changeImage
} from "../../actions/myaccount";
import { reloadUsername } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Avatar from "react-avatar-edit";
import {
  SHIFT_WHEN_DRAWER_CLOSE,
  SHIFT_WHEN_DRAWER_OPEN
} from "../../constants";
const pageTitle = "My account";
const pageSubtitle = "Your edit account page";

const styles = theme => ({
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
  },
  bigAvatar: {
    margin: 0,
    width: 200,
    height: 200
  },
  iconsM: {
    padding: "3%"
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 2}px 0`
  },
  inputs: {
    width: "100%"
  },
  show: {
    display: "block"
  },
  hide: {
    display: "none"
  }
});

export class Myaccount extends React.Component {
  constructor(props) {
    super(props);
    const src = this.props.userImage;
    this.state = {
      preview: null,
      src
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
    this.refs["preview"].className = this.props.classes.hide;
  }

  onCrop(preview) {
    this.setState({ preview });
    this.refs["preview"].className = this.props.classes.show;
  }
  onBeforeFileLoad(elem) {
    console.log(elem.target.files);
    if (elem.target.files[0].size > 1000000000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }

  state = {
    currentPassword: null,
    newPassword: null,
    newUsername: null
  };

  handelChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  onSubmitPassword = e => {
    e.preventDefault();
    this.props.changePassword(
      this.props.userId,
      this.state.currentPassword,
      this.state.newPassword
    );
  };

  onSubmitUsername = e => {
    e.preventDefault();
    this.props.changeUsername(this.props.userId, this.state.newUsername);

    this.props.reloadUsername(this.state.newUsername);
  };

  onSubmitImage = e => {
    e.preventDefault();
    this.props.changeImage(this.props.userId, this.state.preview);
  };

  render() {
    const { classes, isDrawerOpen } = this.props;

    return (
      <div className="container">
        <PageTitle
          isDrawerOpen={isDrawerOpen}
          title={pageTitle}
          subtitle={pageSubtitle}
        />
        <div
          className={classNames(
            classes.cardGrid,
            {
              [classes.shiftForDrawerOpen]: isDrawerOpen
            },
            {
              [classes.shiftForDrawerClosed]: !isDrawerOpen
            }
          )}
        >
          <div className="col-md-6 m-auto">
            <div className="card card-body">
              <center>
                <form onSubmit={this.onSubmitImage}>
                  <MyAvatar
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    onClose={this.onClose}
                    onCrop={this.onCrop}
                  />
                  <img
                    style={{ height: "170px", width: "170px", marginTop: "3%" }}
                    src={this.state.preview}
                    alt="Preview"
                    className={classes.hide}
                    ref="preview"
                  />
                  <Button
                    type="submit"
                    style={{ marginTop: "3%" }}
                    className={classes.inputs}
                    variant="contained"
                    color="secondary"
                    disabled={!this.state.preview}
                  >
                    Change profile image
                    <SendIcon />
                  </Button>
                </form>
              </center>

              <Grid container className={classes.iconsM} />
              <form onSubmit={this.onSubmitUsername}>
                <TextField
                  id="outlined-username-input"
                  label="New Username"
                  name="newUsername"
                  className={classes.inputs}
                  type="text"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handelChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.inputs}
                  disabled={
                    !this.state.newUsername || this.state.newUsername.length < 5
                  }
                >
                  Change username
                  <SendIcon />
                </Button>
              </form>
              <form onSubmit={this.onSubmitPassword}>
                <TextField
                  id="outlined-password-input"
                  label="Current Password"
                  name="currentPassword"
                  className={classes.inputs}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handelChange}
                />

                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  className={classes.inputs}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  name="newPassword"
                  onChange={this.handelChange}
                />
                <Button
                  type="submit"
                  className={classes.inputs}
                  variant="contained"
                  color="secondary"
                  disabled={
                    !this.state.currentPassword ||
                    this.state.currentPassword.length < 8 ||
                    !this.state.newPassword ||
                    this.state.newPassword.length < 8
                  }
                >
                  Change password
                  <SendIcon />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MyAvatar = ({ onCrop, onClose, onBeforeFileLoad, src = "" }) => (
  <Avatar
    width={200}
    height={200}
    onCrop={onCrop}
    onClose={onClose}
    onBeforeFileLoad={onBeforeFileLoad}
    src={src}
  />
);

Myaccount.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isDrawerOpen: state.drawer.isDrawerOpen,
  username: state.auth.user.username,
  userId: state.auth.user.id,
  userImage: state.auth.user.image,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { getCount, changePassword, changeUsername, changeImage, reloadUsername }
)(withStyles(styles, { withTheme: true })(Myaccount));
