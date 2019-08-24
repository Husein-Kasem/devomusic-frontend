import React, { Component /*Fragment*/ } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/layout/Header";
import Albums from "./components/albums/Albums";
import Songs from "./components/songs/Songs";
import Artists from "./components/artists/Artists";
import ArtistDetails from "./components/artists/ArtistDetails";
import ArtistSongs from "./components/songs/ArtistSongs";
import ArtistAlbums from "./components/albums/ArtistAlbums";
import AlbumSongs from "./components/songs/AlbumSongs";
import PlaylistSongs from "./components/playlists/PlaylistSongs";
import MusicPlayer from "./components/musicplayerSrc/MusicPlayer";
import Genres from "./components/genres/Genres";
import GenreAlbums from "./components/genres/GenreAlbums";
import Alerts from "./components/layout/Alerts";
import Login from "./components/accounts/Login";

import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminRoute from "./components/common/AdminRoute";

import { Provider } from "react-redux";
import store from "./store";
import Sidebar from "./components/layout/Sidebar";
import { ALERT_OPTIONS } from "./constants";
import { loadUser } from "./actions/auth";
import playlists from "./components/playlists/Playlists";
import userPlaylists from "./components/playlists/UserPlaylists";
import recommended from "./components/recommended/Recommended";
import favorite from "./components/favorites/Favorites";
//import musicPlayer from "./reducers/musicPlayer";
import history from "./components/history/History";
import search from "./components/search/Search";
import profile from "./components/accounts/Profile";
import Myaccount from "./components/accounts/Myaccount";
import home from "./components/home/Home";
import ChoosePlaylistDialog from "./components/playlists/ChoosePlaylistDialog";
import Admin from "./components/accounts/Admin";
import AdminUsers from "./components/accounts/AdminUsers";
import AdminStats from "./components/accounts/AdminStatistics";
import InscriptionStats from "./components/accounts/InscriptionStatistics";
import TargetStats from "./components/accounts/TargetStatistics";
import MusicStats from "./components/accounts/MusicStatistics";
import Chatbot from "./components/chatbot/Chatbot";

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  }
});

// Alert Options
const alertOptions = ALERT_OPTIONS;

class App extends Component {
  componentDidMount() {
    // this will be used to load the user
    // from the backend according if we have a token or not
    store.dispatch(loadUser());
  }

  render() {
    //const { classes } = this.props;
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <div id="playerContainer">
              <CssBaseline />
              <Header />
              <Sidebar />
              <Alerts />
              <ChoosePlaylistDialog />
              <Chatbot />

              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute exact path="/profile" component={profile} />
                <PrivateRoute exact path="/myaccount" component={Myaccount} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/playlists" component={playlists} />
                <PrivateRoute
                  exact
                  path="/userplaylists"
                  component={userPlaylists}
                />
                <PrivateRoute
                  exact
                  path="/recommended"
                  component={recommended}
                />
                <PrivateRoute exact path="/favorite" component={favorite} />
                <PrivateRoute exact path="/history" component={history} />
                <Route
                  exact
                  path="/albumsongs/:album_id"
                  component={AlbumSongs}
                />
                <Route exact path="/songs" component={Songs} />
                <Route exact path="/artists" component={Artists} />
                <Route
                  exact
                  path="/artistalbums/:artist_id"
                  component={ArtistAlbums}
                />
                <Route
                  exact
                  path="/artistsongs/:artist_id"
                  component={ArtistSongs}
                />
                <Route
                  exact
                  path="/artistdetail/:artist_id"
                  component={ArtistDetails}
                />
                <Route
                  exact
                  path="/playlistsongs/:playlist_id"
                  component={PlaylistSongs}
                />
                <Route exact path="/search/:search_name" component={search} />
                <Route exact path="/albums" component={Albums} />
                <Route exact path="/genres" component={Genres} />
                <AdminRoute exact path="/admin" component={Admin} />
                <AdminRoute exact path="/admin/users" component={AdminUsers} />
                <AdminRoute exact path="/admin/stats" component={AdminStats} />
                <AdminRoute
                  exact
                  path="/admin/stats/inscription"
                  component={InscriptionStats}
                />
                <AdminRoute
                  exact
                  path="/admin/stats/target"
                  component={TargetStats}
                />
                <AdminRoute
                  exact
                  path="/admin/stats/music"
                  component={MusicStats}
                />
                <Route
                  exact
                  path="/genrealbums/:genre_id"
                  component={GenreAlbums}
                />
              </Switch>
              <MusicPlayer />
            </div>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
