import React, { Component, Fragment } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { openDrawer, closeDrawer } from "../../actions/drawer";
import Autosuggest from "react-autosuggest";
import deburr from "lodash/deburr";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LoginIcon from "@material-ui/icons/ExitToApp";
import RegisterIcon from "@material-ui/icons/AssignmentInd";
import LogoutIcon from "@material-ui/icons/Input";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { DRAWER_WIDTH } from "../../constants";
import { loadSearchCommons } from "../../actions/search";
import { loadArtists } from "../../actions/artists";
import { loadPlaylists } from "../../actions/playlists";
import { loadSongs } from "../../actions/songs";
import { loadAlbums } from "../../actions/albums";

const drawerWidth = DRAWER_WIDTH;

const styles = theme => ({
  root: {
    display: "flex",
    height: 30,
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  grow: {
    flexGrow: 1
  },
  menuButton2: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "70%",
    cursor: "pointer"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },

  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

export class Header extends Component {
  getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : this.state.suggestComb.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    );
  }

  searchSuggest = event => {
    console.log(event);
  };

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.name, query);
    const parts = parse(suggestion.name, matches);

    return (
      <MenuItem
        onClick={() => this.searchSuggest(suggestion)}
        selected={isHighlighted}
        component="div"
      >
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
        </div>
      </MenuItem>
    );
  };

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    single: "",
    suggestions: [],
    suggestComb: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  loadSearch = () => {
    this.props.loadSongs();
    this.props.loadAlbums();
    this.props.loadArtists();
    this.props.loadPlaylists();
    this.props.loadSearchCommons();
  };

  formatName = name => {
    return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
  };

  componentWillReceiveProps(nextProps) {
    let suggestComb = [];
    if (this.state.suggestComb != null) suggestComb = this.state.suggestComb;

    if (nextProps.artists && nextProps.artists.length > 0) {
      nextProps.artists.forEach(artist => {
        let artistObj = { name: this.formatName(artist.name) };
        if (!suggestComb.some(e => e.name === artistObj.name))
          suggestComb.push(artistObj);
      });
    }

    if (nextProps.albums && nextProps.albums.length > 0) {
      nextProps.albums.forEach(album => {
        let albumObj = { name: this.formatName(album.name) };
        if (!suggestComb.some(e => e.name === albumObj.name))
          suggestComb.push(albumObj);
      });
    }

    if (nextProps.songs && nextProps.songs.length > 0) {
      nextProps.songs.forEach(song => {
        let songObj = { name: this.formatName(song.name) };
        if (!suggestComb.some(e => e.name === songObj.name)) {
          suggestComb.push(songObj);
        }
      });
    }

    if (nextProps.playlists && nextProps.playlists.length > 0) {
      nextProps.playlists.forEach(playlist => {
        let playlistObj = { name: this.formatName(playlist.name) };
        if (!suggestComb.some(e => e.name === playlistObj.name))
          suggestComb.push(playlistObj);
      });
    }

    if (nextProps.searchCommons && nextProps.searchCommons.length > 0) {
      nextProps.searchCommons.forEach(searchCommon => {
        let searchCommonObj = { name: this.formatName(searchCommon.name) };
        if (!suggestComb.some(e => e.name === searchCommonObj.name))
          suggestComb.push(searchCommonObj);
      });
    }
    this.setState({
      suggestComb: suggestComb
    });
  }

  componentDidMount() {
    this.loadSearch();
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  searchSuggest = sug => {
    console.log(sug);

    let { history } = this.props;
    history.push({
      pathname: "/search/" + sug.name
    });
  };

  search = event => {
    if (event.key === "Enter") {
      let { history } = this.props;
      history.push({
        pathname: "/search/" + event.target.value
      });
    }
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired,
    closeDrawer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  render() {
    //const searchCommons = this.props.searchCommons;
    const renderInputComponent = this.renderInputComponent;
    const getSuggestionValue = this.getSuggestionValue;
    const renderSuggestion = this.renderSuggestion;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    const { isAuthenticated, user } = this.props.auth;
    const { isDrawerOpen } = this.props;
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const LoginLink = props => <RouterLink to="/login" {...props} />;
    const RegisterLink = props => <RouterLink to="/register" {...props} />;

    // for now those are the admin links
    const adminLinks = (
      <Button className={classes.button} color="inherit">
        {user ? `Welcome Admin ${user.username}` : ""}
      </Button>
    );

    // for now those are the user links
    const userLinks = (
      <Button className={classes.button} color="inherit">
        {user ? `Welcome ${user.username}` : ""}
      </Button>
    );

    //link to profile page
    const linkProfile = props => <RouterLink to="/profile" {...props} />;
    const linkMyAccount = props => <RouterLink to="/myaccount" {...props} />;
    const linkAdmin = props => <RouterLink to="/admin" {...props} />;
    const renderAccountMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <Link component={linkProfile}>
          <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        </Link>
        <Link component={linkMyAccount}>
          <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        </Link>
        {user !== null && user.type === "admin" ? (
          <Link component={linkAdmin}>
            <MenuItem id="AdminButton" onClick={this.handleMenuClose}>
              Admin
            </MenuItem>
          </Link>
        ) : null}
      </Menu>
    );

    const authLinks = (
      <Fragment>
        {user !== null ? (user.type === "admin" ? adminLinks : userLinks) : ""}
        <Button
          className={classes.button}
          color="inherit"
          onClick={this.props.logout}
        >
          <LogoutIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Logout
        </Button>

        <Button
          className={classes.button}
          color="inherit"
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
        >
          <AccountCircle
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Account
        </Button>
      </Fragment>
    );

    const authLinksMobile = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose && this.props.logout}>
          <Button className={classes.button} color="inherit">
            <LogoutIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Logout
          </Button>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Button
            className={classes.button}
            color="inherit"
            aria-owns={isMenuOpen ? "material-appbar" : undefined}
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
          >
            <AccountCircle
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Account
          </Button>
        </MenuItem>
      </Menu>
    );

    const guestLinksMobile = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Link
            className="navigationlink"
            component={RegisterLink}
            color="inherit"
          >
            <Button className={classes.button} color="inherit">
              <RegisterIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Register
            </Button>
          </Link>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Link
            className="navigationlink"
            component={LoginLink}
            color="inherit"
          >
            <Button className={classes.button} color="inherit">
              <LoginIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Login
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    );

    const guestLinks = (
      <Fragment>
        <Link
          className="navigationlink"
          component={RegisterLink}
          color="inherit"
        >
          <Button className={classes.button} color="inherit">
            <RegisterIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Register
          </Button>
        </Link>
        <Link className="navigationlink" component={LoginLink} color="inherit">
          <Button className={classes.button} color="inherit">
            <LoginIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Login
          </Button>
        </Link>
      </Fragment>
    );

    const renderMobileMenu = (
      <div>{isAuthenticated ? authLinksMobile : guestLinksMobile}</div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: isDrawerOpen
          })}
        >
          <Toolbar disableGutters={!isDrawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.openDrawer}
              className={classNames(classes.menuButton, {
                [classes.hide]: isDrawerOpen
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              DevoMusic
            </Typography>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </div>

              <Autosuggest
                className={classNames(classes.search)}
                {...autosuggestProps}
                ref="searchInput"
                inputProps={{
                  classes,
                  placeholder: "Search...",
                  value: this.state.single,
                  onChange: this.handleChange("single"),
                  onKeyPress: this.search
                }}
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderAccountMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  isAlbumsLoading: PropTypes.bool.isRequired,
  isPlaylistsLoading: PropTypes.bool.isRequired,
  isSongsLoading: PropTypes.bool.isRequired,
  isArtistsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isDrawerOpen: state.drawer.isDrawerOpen,
  isCommonsLoading: state.search.isCommonsLoading,
  searchCommons: state.search.searchCommons,
  albums: state.albums.data,
  songs: state.songs.data,
  artists: state.artists.artists,
  playlists: state.playlists.playlists,
  isSongsLoading: state.songs.isLoading,
  isPlaylistsLoading: state.playlists.isLoading,
  isAlbumsLoading: state.albums.isLoading,
  isArtistsLoading: state.artists.isLoading
});

export default connect(
  mapStateToProps,
  {
    logout,
    openDrawer,
    closeDrawer,
    loadSearchCommons,
    loadAlbums,
    loadArtists,
    loadPlaylists,
    loadSongs
  }
)(withStyles(styles, { withTheme: true })(withRouter(Header)));
