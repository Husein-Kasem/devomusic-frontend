import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import Input from "@material-ui/core/Input";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Save from "@material-ui/icons/Save";
import { editRole } from "../../actions/admin";

const styles = theme => ({
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  listItem: {
    width: "260px"
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  save: {
    marginTop: "2%",
    cursor: "pointer"
  }
});

class UserListItem extends React.Component {
  editRole() {
    this.props.editRole(this.props.user.id, this.state.role);

    this.setState({ showSave: false });
    this.props.user.role = this.state.role;
  }

  state = {
    labelWidth: 0,
    role: "",
    showSave: false
  };

  componentDidMount() {
    this.setState({
      //labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      role: this.props.user.role
    });
  }

  setRoleSelect() {
    let toReturn = [];
    this.props.roles.forEach(role => {
      if (role === this.props.user.role) {
        toReturn.push(
          <MenuItem value={role}>
            <em>{role}</em>
          </MenuItem>
        );
      } else {
        toReturn.push(<MenuItem value={role}>{role}</MenuItem>);
      }
    });
    return toReturn;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.value !== this.props.user.role.toUpperCase()) {
      this.setState({ showSave: true });
    } else {
      this.setState({ showSave: false });
    }
  };

  render() {
    const { user, classes } = this.props;
    return (
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt={user.username}
            src={user.profileImage + "?" + user.imageDate}
          />
        </ListItemAvatar>
        <ListItemText
          primary={`${user.id} : ${user.username}`}
          secondary={
            <React.Fragment>
              <Typography>{user.email}</Typography>
            </React.Fragment>
          }
        />
        {this.state.showSave ? (
          <Save onClick={() => this.editRole()} className={classes.save} />
        ) : null}
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="user-role">
              Role
            </InputLabel>
            <Select
              value={this.state.role}
              onChange={this.handleChange}
              input={<Input name="role" id="role-label-placeholder" />}
              displayEmpty
              name="role"
              className={classes.selectEmpty}
            >
              {this.setRoleSelect()}
            </Select>
          </FormControl>
        </form>
      </ListItem>
    );
  }
}

UserListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  roles: state.admin.roles
});

export default connect(
  mapStateToProps,
  { editRole }
)(withStyles(styles, { withTheme: true })(UserListItem));
