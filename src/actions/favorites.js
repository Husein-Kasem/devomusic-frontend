import { returnErrors, createMessage } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import {
  FAVORITE_ALBUMS_LOADED,
  FAVORITE_ALBUMS_LOADING,
  FAVORITE_ALBUMS_LOADING_FAILED,
  FAVORITE_SONGS_LOADED,
  FAVORITE_SONGS_LOADING,
  FAVORITE_SONGS_LOADING_FAILED,
  FAVORITE_PLAYLISTS_LOADED,
  FAVORITE_PLAYLISTS_LOADING,
  FAVORITE_PLAYLISTS_LOADING_FAILED,
  ADD_SONG_TO_FAVORITES,
  REMOVE_SONG_FROM_FAVORITES,
  ADD_ALBUM_TO_FAVORITES,
  REMOVE_ALBUM_FROM_FAVORITES,
  ADD_PLAYLIST_TO_FAVORITES,
  REMOVE_PLAYLIST_FROM_FAVORITES
} from "./types";
import { getFetchHeaderConfig } from "../utils";

export const loadFavoriteAlbums = () => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    dispatch({
      type: FAVORITE_ALBUMS_LOADING
    });

    const requestUrl = `${BASE_URL}music/favorite/getalbumbyuserid?id=${
      getState().auth.user.id
    }`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
      .then(res => {
        res.json().then(response => {
          dispatch({
            type: FAVORITE_ALBUMS_LOADED,
            payload: response
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to get favorite albums information",
            err.status
          )
        );
        dispatch({
          type: FAVORITE_ALBUMS_LOADING_FAILED
        });
      });
  } else {
    dispatch(
      returnErrors("Can not load favorites of an unauthenticated user", "")
    );
  }
};

export const loadFavoriteSongs = () => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    dispatch({
      type: FAVORITE_SONGS_LOADING
    });

    const requestUrl = `${BASE_URL}music/favorite/getsongbyuserid?id=${
      getState().auth.user.id
    }`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
      .then(res => {
        res.json().then(response => {
          dispatch({
            type: FAVORITE_SONGS_LOADED,
            payload: response
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to get favorite songs information",
            err.status ? err.status : ""
          )
        );
        dispatch({
          type: FAVORITE_SONGS_LOADING_FAILED
        });
      });
  } else {
    dispatch(
      returnErrors("Can not load favorites of an unauthenticated user", "")
    );
  }
};

export const loadFavoritePlaylists = () => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    dispatch({
      type: FAVORITE_PLAYLISTS_LOADING
    });

    const requestUrl = `${BASE_URL}music/favorite/getplaylistbyuserid?id=${
      getState().auth.user.id
    }`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
      .then(res => {
        res.json().then(response => {
          dispatch({
            type: FAVORITE_PLAYLISTS_LOADED,
            payload: response
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to get favorite playlists information",
            err.status ? err.status : ""
          )
        );
        dispatch({
          type: FAVORITE_PLAYLISTS_LOADING_FAILED
        });
      });
  } else {
    dispatch(
      returnErrors("Can not load favorites of an unauthenticated user", "")
    );
  }
};

export const addSongFavorite = song => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/addsong?userId=${
      getState().auth.user.id
    }&songId=${song.id}`;
    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
      .then(data => {
        dispatch(createMessage("song added to your favorites"));
        dispatch({
          type: ADD_SONG_TO_FAVORITES,
          payload: song
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite a song", ""));
  }
};

export const addAlbumFavorite = album => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/addalbum?userId=${
      getState().auth.user.id
    }&albumId=${album.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
      .then(data => {
        data.text().then(txt => {
          if (txt === "success") {
            dispatch(createMessage("Album added to your favorites"));
            dispatch({
              type: ADD_ALBUM_TO_FAVORITES,
              payload: album
            });
          } else {
            dispatch(returnErrors(txt, ""));
          }
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite an album", ""));
  }
};

export const addPlaylistFavorite = playlist => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/addplaylist?userId=${
      getState().auth.user.id
    }&playlistId=${playlist.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
      .then(data => {
        data.text().then(txt => {
          if (txt === "success") {
            dispatch(createMessage("Playlist added to your favorites"));
            dispatch({
              type: ADD_PLAYLIST_TO_FAVORITES,
              payload: playlist
            });
          } else {
            dispatch(returnErrors(txt, ""));
          }
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite a playlist", ""));
  }
};

export const removeSongFromFavorite = song => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/deletesong?userId=${
      getState().auth.user.id
    }&songId=${song.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.DELETE))
      .then(data => {
        dispatch(createMessage("Song removed from your favorites"));
        dispatch({
          type: REMOVE_SONG_FROM_FAVORITES,
          payload: song
        });
        console.log(data);
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite a song", ""));
  }
};

export const removeAlbumFromFavorite = album => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/deletealbum?userId=${
      getState().auth.user.id
    }&albumId=${album.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.DELETE))
      .then(data => {
        data.text().then(txt => {
          if (txt === "'message':'success'") {
            dispatch(createMessage("Album removed from your favorites"));
            dispatch({
              type: REMOVE_ALBUM_FROM_FAVORITES,
              payload: album
            });
          } else {
            dispatch(returnErrors(txt, ""));
          }
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite an album", ""));
  }
};

export const removePlaylistFromFavorite = playlist => (dispatch, getState) => {
  if (getState().auth.isAuthenticated) {
    const requestUrl = `${BASE_URL}music/favorite/deleteplaylist?userId=${
      getState().auth.user.id
    }&playlistId=${playlist.id}`;
    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.DELETE))
      .then(data => {
        data.text().then(txt => {
          if (txt === "success") {
            dispatch(createMessage("Playlist removed from your favorites"));
            dispatch({
              type: REMOVE_PLAYLIST_FROM_FAVORITES,
              payload: playlist
            });
          } else {
            dispatch(returnErrors(txt, ""));
          }
        });
      })
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error, ""));
      });
  } else {
    dispatch(returnErrors("You must be logged in to favorite a playlist", ""));
  }
};
