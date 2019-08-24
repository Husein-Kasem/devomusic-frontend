import { returnErrors, createMessage } from "./messages";
import {
  BASE_URL,
  getFromHttpInsteadOfFtp,
  REQUEST_METHODES
} from "../constants";
import {
  PLAYLISTS_LOADED,
  PLAYLISTS_LOADING,
  PLAYLISTS_LOADING_FAILED,
  USER_PLAYLISTS_LOADED,
  USER_PLAYLISTS_LOADING,
  USER_PLAYLISTS_LOADING_FAILED,
  PLAYLIST_SONGS_LOADED,
  PLAYLIST_SONGS_LOADING,
  PLAYLIST_SONGS_LOADING_FAILED,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  OPEN_CHOOSE_PLAYLIST_DIALOG,
  CLOSE_CHOOSE_PLAYLIST_DIALOG
} from "./types";

import { getFetchHeaderConfig } from "../utils";

export const loadPlaylists = () => dispatch => {
  dispatch({ type: PLAYLISTS_LOADING });

  const requestUrl = `${BASE_URL}music/playlist/getpopular`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: PLAYLISTS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get playlists information",
          err.status
        )
      );
      dispatch({
        type: PLAYLISTS_LOADING_FAILED
      });
    });
};

export const loadPlaylistSongs = playlistId => dispatch => {
  dispatch({ type: PLAYLIST_SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/playlist/getsongs?playlistId=${playlistId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        let result = [];
        response.forEach(song => {
          //let obj = JSON.parse(str);
          // to solve FTP blockage from the browser
          song.file = getFromHttpInsteadOfFtp(song.file);
          song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

          result.push(song);
        });
        dispatch({
          type: PLAYLIST_SONGS_LOADED,
          payload: result
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get songs information",
          err.status
        )
      );
      dispatch({
        type: PLAYLIST_SONGS_LOADING_FAILED
      });
    });
};

export const loadUserPlaylists = () => (dispatch, getState) => {
  const { user, isAuthenticated } = getState().auth;
  if (isAuthenticated && user !== null) {
    dispatch({ type: USER_PLAYLISTS_LOADING });

    const requestUrl = `${BASE_URL}music/playlist/findbyuserid?id=${
      getState().auth.user.id
    }`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
      .then(res => {
        res.json().then(response => {
          dispatch({
            type: USER_PLAYLISTS_LOADED,
            payload: response
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to get playlists information",
            err.status
          )
        );
        dispatch({
          type: USER_PLAYLISTS_LOADING_FAILED
        });
      });
  }
};

export const addPlaylist = name => (dispatch, getState) => {
  const requestUrl = `${BASE_URL}music/playlist/add?name=${name}&userId=${
    getState().auth.user.id
  }`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
    .then(res => {
      res.json().then(response => {
        if (res.status !== 200) {
          dispatch(returnErrors(response.message, ""));
        } else {
          dispatch({
            type: ADD_PLAYLIST,
            payload: response.playlists[0]
          });
          dispatch(createMessage(response.message));
        }
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to add a playlist",
          err.status
        )
      );
      dispatch({
        type: PLAYLISTS_LOADING_FAILED
      });
    });
};

export const addSongToPlaylist = (playlistId, songId) => (
  dispatch,
  getState
) => {
  const requestUrl = `${BASE_URL}music/playlist/addsong?playlistId=${playlistId}&songId=${songId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
    .then(res => {
      dispatch(createMessage("Song added to playlist"));
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to add the song to the playlist",
          err.status
        )
      );
    });
};

export const deletePlaylist = playlist => (dispatch, getState) => {
  const requestUrl = `${BASE_URL}music/playlist/delete?playlistId=${
    playlist.id
  }`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.DELETE)).then(res => {
    res
      .json()
      .then(response => {
        dispatch({
          type: REMOVE_PLAYLIST,
          payload: playlist
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to delete the playlist",
            err.status
          )
        );
      });
  });
};

// SHOW CHOOSE PLAYLIST DIALOG
export const openChoosePlaylistDialog = song => dispatch => {
  dispatch({ type: OPEN_CHOOSE_PLAYLIST_DIALOG, payload: song });
};

// SHOW CHOOSE PLAYLIST DIALOG
export const closeChoosePlaylistDialog = () => dispatch => {
  dispatch({ type: CLOSE_CHOOSE_PLAYLIST_DIALOG });
};
