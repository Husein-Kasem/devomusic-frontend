import { returnErrors } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig } from "../utils";

import {
  ARTISTS_LOADED,
  ARTISTS_LOADING,
  ARTISTS_LOADING_FAILED,
  ARTIST_ALBUMS_LOADED,
  ARTIST_ALBUMS_LOADING,
  ARTIST_ALBUMS_LOADING_FAILED,
  ARTIST_SONGS_LOADED,
  ARTIST_SONGS_LOADING,
  ARTIST_SONGS_LOADING_FAILED,
  ARTIST_DETAILS_LOADED,
  ARTIST_DETAILS_LOADING,
  ARTIST_DETAILS_LOADING_FAILED
} from "./types";

export const loadArtists = () => (dispatch, getState) => {
  dispatch({ type: ARTISTS_LOADING });

  const requestUrl = `${BASE_URL}music/artist/getall`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ARTISTS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get artists information",
          err.status
        )
      );
      dispatch({
        type: ARTISTS_LOADING_FAILED
      });
    });
};

export const loadArtistDetails = artistId => (dispatch, getState) => {
  dispatch({ type: ARTIST_DETAILS_LOADING });

  const requestUrl = `${BASE_URL}music/artist/findbyid?id=${artistId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ARTIST_DETAILS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get the information of the artist",
          err.status
        )
      );
      dispatch({
        type: ARTIST_DETAILS_LOADING_FAILED
      });
    });
};

export const loadArtistAlbums = artistId => (dispatch, getState) => {
  dispatch({ type: ARTIST_ALBUMS_LOADING });

  const requestUrl = `${BASE_URL}music/album/findbyartistid?id=${artistId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ARTIST_ALBUMS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get the albums information of the artist",
          err.status
        )
      );
      dispatch({
        type: ARTIST_ALBUMS_LOADING_FAILED
      });
    });
};

export const loadArtistSongs = artistId => (dispatch, getState) => {
  dispatch({ type: ARTIST_SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/findbyartistid?id=${artistId}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ARTIST_SONGS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get the songs information of the artist",
          err.status
        )
      );
      dispatch({
        type: ARTIST_SONGS_LOADING_FAILED
      });
    });
};
