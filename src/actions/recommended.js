import axios from "axios";
import { returnErrors } from "./messages";
import { BASE_URL } from "../constants";
import {
  RECOMMENDED_ALBUMS_LOADED,
  RECOMMENDED_ALBUMS_LOADING,
  RECOMMENDED_ALBUMS_LOADING_FAILED,
  RECOMMENDED_SONGS_LOADED,
  RECOMMENDED_SONGS_LOADING,
  RECOMMENDED_SONGS_LOADING_FAILED,
  RECOMMENDED_PLAYLISTS_LOADED,
  RECOMMENDED_PLAYLISTS_LOADING,
  RECOMMENDED_PLAYLISTS_LOADING_FAILED,
} from "./types";
import { getHeaderConfig } from "../utils";

export const loadRecommendedAlbums = (userId, size = -1) => dispatch => {
  dispatch({ type: RECOMMENDED_ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/getrecommended?userId=${userId}&size=${size}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: RECOMMENDED_ALBUMS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get recommended albums information",
          err.status
        )
      );
      dispatch({
        type: RECOMMENDED_ALBUMS_LOADING_FAILED,
      });
    });
};

export const loadRecommendedSongs = (userId, size = -1) => dispatch => {
  dispatch({ type: RECOMMENDED_SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/getrecommended?userId=${userId}&size=${size}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: RECOMMENDED_SONGS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get recommended songs information",
          err.status
        )
      );
      dispatch({
        type: RECOMMENDED_SONGS_LOADING_FAILED,
      });
    });
};

export const loadRecommendedPlaylists = (userId, size = -1) => dispatch => {
  dispatch({ type: RECOMMENDED_PLAYLISTS_LOADING });

  const requestUrl = `${BASE_URL}music/playlist/getrecommended?userId=${userId}&size=${size}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: RECOMMENDED_PLAYLISTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get recommended playlists information",
          err.status
        )
      );
      dispatch({
        type: RECOMMENDED_PLAYLISTS_LOADING_FAILED,
      });
    });
};
