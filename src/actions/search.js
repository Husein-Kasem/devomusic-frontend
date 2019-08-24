import axios from "axios";
import { returnErrors } from "./messages";
import { BASE_URL } from "../constants";

import {
  SEARCH_ALBUMS_LOADED,
  SEARCH_ALBUMS_LOADING,
  SEARCH_ALBUMS_LOADING_FAILED,
  SEARCH_SONGS_LOADED,
  SEARCH_SONGS_LOADING,
  SEARCH_SONGS_LOADING_FAILED,
  SEARCH_PLAYLISTS_LOADED,
  SEARCH_PLAYLISTS_LOADING,
  SEARCH_PLAYLISTS_LOADING_FAILED,
  SEARCH_ARTISTS_LOADED,
  SEARCH_ARTISTS_LOADING,
  SEARCH_ARTISTS_LOADING_FAILED,
  SEARCH_COMMONS_LOADED,
  SEARCH_COMMONS_LOADING,
  SEARCH_COMMONS_LOADING_FAILED,
} from "./types";

import { getHeaderConfig } from "../utils";

export const addCommonSearch = name => dispatch => {
  if (name != null) {
    const requestUrl = `${BASE_URL}music/search/add?name=${name}`;
    axios
      .post(requestUrl, getHeaderConfig())
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        err.response &&
          //dispatch(returnErrors(err.response.data, err.response.status))) ||
          dispatch(
            returnErrors(
              "something went wrong when adding common search",
              err.status
            )
          );
      });
  }
};

export const loadSearchCommons = () => dispatch => {
  dispatch({ type: SEARCH_COMMONS_LOADING });

  const requestUrl = `${BASE_URL}music/search/findcommons`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: SEARCH_COMMONS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get search common search information",
          err.status
        )
      );
      dispatch({
        type: SEARCH_COMMONS_LOADING_FAILED,
      });
    });
};

export const loadSearchArtists = name => dispatch => {
  dispatch({ type: SEARCH_ARTISTS_LOADING });

  const requestUrl = `${BASE_URL}music/artist/search?name=${name}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      console.log(res);
      dispatch({
        type: SEARCH_ARTISTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get search albums information",
          err.status
        )
      );
      dispatch({
        type: SEARCH_ARTISTS_LOADING_FAILED,
      });
    });
};

export const loadSearchAlbums = name => dispatch => {
  dispatch({ type: SEARCH_ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/search?name=${name}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      console.log(res);
      dispatch({
        type: SEARCH_ALBUMS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get search albums information",
          err.status
        )
      );
      dispatch({
        type: SEARCH_ALBUMS_LOADING_FAILED,
      });
    });
};

export const loadSearchSongs = name => dispatch => {
  dispatch({ type: SEARCH_SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/search?name=${name}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: SEARCH_SONGS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get search songs information",
          err.status
        )
      );
      dispatch({
        type: SEARCH_SONGS_LOADING_FAILED,
      });
    });
};

export const loadSearchPlaylists = name => dispatch => {
  dispatch({ type: SEARCH_PLAYLISTS_LOADING });

  const requestUrl = `${BASE_URL}music/playlist/search?name=${name}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      dispatch({
        type: SEARCH_PLAYLISTS_LOADED,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get search playlists information",
          err.status
        )
      );
      dispatch({
        type: SEARCH_PLAYLISTS_LOADING_FAILED,
      });
    });
};
