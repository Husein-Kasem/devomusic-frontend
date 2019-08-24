import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage, returnErrors } from "../../actions/messages";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import DevoteamIcon from "../common/DevoteamIcon";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { formateDate } from "../../utils";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: "20px",
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: "20px"
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
    margin: theme.spacing.unit * 3,
    width: "100px",
    height: "100px",
    backgroundColor: "#ffffff"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    backgroundColor: "inherit",
    color: theme.color // "inherit"
    //border: "inherit"
  },
  marTop: {
    marginTop: theme.spacing.unit * 3
  }
});

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    birthday: null,
    gender: "Male",
    countriesList: [],
    country: "Belgium"
  };

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then(res =>
        res.json().then(response => {
          this.setState({ countriesList: response });
        })
      )
      .catch(err => {
        console.log(err);
        this.setState({
          countriesList: [
            {
              name: "Belgium",
              alpha3Code: "BEL"
            },
            {
              name: "Netherlands",
              alpha3Code: "NLD"
            },
            {
              name: "Morocco",
              alpha3Code: "MOR"
            },
            {
              name: "Germany",
              alpha3Code: "GER"
            },
            {
              name: "Palestine",
              alpha3Code: "PAL"
            }
          ]
        });
      });
  }

  handleDateChange = date => {
    this.setState({
      birthday: date
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      username,
      email,
      password,
      password2,
      gender,
      country,
      birthday
    } = this.state;
    if (password !== password2) {
      this.props.returnErrors("Passwords do not match", "");
    } else if (!birthday) {
      this.props.returnErrors("Please choose your birthday", "");
    } else {
      const newUser = {
        username,
        password,
        email,
        gender,
        country,
        birthDate: formateDate(birthday, "_")
      };

      this.props.register(newUser);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      username,
      email,
      password,
      password2,
      countriesList,
      birthday
    } = this.state;
    const { classes, isAuthenticated, successfulRegistration } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (successfulRegistration) {
      this.props.createMessage(
        "Please check your mail and confirm your registration"
      );
      return <Redirect to="/login" />;
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <DevoteamIcon color="#be2409" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                name="username"
                value={username}
                autoComplete="username"
                autoFocus
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                name="email"
                value={email}
                type="email"
                autoComplete="email"
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                value={password}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm password</InputLabel>
              <Input
                name="password2"
                type="password"
                value={password2}
                onChange={this.onChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  margin="normal"
                  label="Date of birth*"
                  value={birthday}
                  onChange={this.handleDateChange}
                  format="dd/MM/yyyy"
                />
              </MuiPickersUtilsProvider>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.onChange}
                inputProps={{
                  name: "gender",
                  id: "genderSelect"
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                value={this.state.country}
                onChange={this.onChange}
                inputProps={{
                  name: "country",
                  id: "countrySelect"
                }}
              >
                {countriesList.map(tempCountry => (
                  <MenuItem
                    key={tempCountry.alpha3Code}
                    value={tempCountry.name}
                  >
                    {tempCountry.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.marTop}
            >
              Sign up
            </Button>

            <Typography align="center" className={classes.marTop}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
            <Typography align="center" className={classes.marTop}>
              Or
              <Link to="/"> continue as guest </Link>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  successfulRegistration: state.auth.successfulRegistration
});

export default connect(
  mapStateToProps,
  { register, createMessage, returnErrors }
)(withStyles(styles)(Register));
