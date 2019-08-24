import { combineReducers } from "redux";
import playlists from "./playlists";
import errors from "./errors";
import messages from "./messages";
import drawer from "./drawer";
import auth from "./auth";
import albums from "./albums";
import songs from "./songs";
import musicPlayer from "./musicPlayer";
import artists from "./artists";
import recommended from "./recommended"
import favorites from "./favorites";
import history from "./history";
import search from "./search";
import genres from "./genres";
import profile from "./profile";
import admin from "./admin";
import statistics from "./statistics";

export default combineReducers({
  playlists,
  errors,
  messages,
  auth,
  drawer,
  albums,
  songs,
  musicPlayer,
  artists,
  recommended,
  favorites,
  history,
  search,
  genres,
  profile,
  admin,
  statistics
});
