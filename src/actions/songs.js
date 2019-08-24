import axios from "axios";
import { returnErrors } from "./messages";
import { BASE_URL, getFromHttpInsteadOfFtp } from "../constants";

import { SONGS_LOADED, SONGS_LOADING, SONGS_LOADING_FAILED,  HOME_SONGS_LOADED, HOME_SONGS_LOADING, HOME_SONGS_LOADING_FAILED } from "./types";
import { getHeaderConfig } from "../utils";

export const loadSongsOfAlbum = albumId => dispatch => {
  dispatch({ type: SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/album/getsongs?id=${albumId}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      let result = [];
      res.data.forEach(song => {
        //let obj = JSON.parse(str);
        // to solve FTP blockage from the browser
        song.file = getFromHttpInsteadOfFtp(song.file);
        song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

        result.push(song);
      });
      dispatch({
        type: SONGS_LOADED,
        payload: result
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
        type: SONGS_LOADING_FAILED
      });
    });
};

export const loadSongs = (size = 100) => dispatch => {
  dispatch({ type: SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/getpopular?size=${size}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      let result = [];
      res.data.forEach(song => {
        //let obj = JSON.parse(str);
        // to solve FTP blockage from the browser
        song.file = getFromHttpInsteadOfFtp(song.file);
        song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

        result.push(song);
      });
      dispatch({
        type: SONGS_LOADED,
        payload: result
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
        type: SONGS_LOADING_FAILED
      });
    });
};

export const loadHomeSongs = (size = 5) => dispatch => {
  dispatch({ type: HOME_SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/getpopular?size=${size}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      let result = [];
      res.data.forEach(song => {
        //let obj = JSON.parse(str);
        // to solve FTP blockage from the browser
        song.file = getFromHttpInsteadOfFtp(song.file);
        song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

        result.push(song);
      });
      dispatch({
        type: HOME_SONGS_LOADED,
        payload: result
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
        type: HOME_SONGS_LOADING_FAILED
      });
    });
};

//-----------------------------------------------------------------------------
export const getCount = (userId, token) => (dispatch, getState) => {
  dispatch({ type: SONGS_LOADING });
};

export const loadSongsByArtist = artistId => dispatch => {
  dispatch({ type: SONGS_LOADING });

  const requestUrl = `${BASE_URL}music/song/findbyartistid?artist=${artistId}`;

  axios
    .get(requestUrl, getHeaderConfig())
    .then(res => {
      let result = [];
      res.data.forEach(song => {
        //let obj = JSON.parse(str);
        // to solve FTP blockage from the browser
        song.file = getFromHttpInsteadOfFtp(song.file);
        song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

        result.push(song);
      });
      dispatch({
        type: SONGS_LOADED,
        payload: result
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
        type: SONGS_LOADING_FAILED
      });
    });
};

/*
export const loadPopularSong = albumId => (dispatch, getState) => {
  dispatch({ type: SONGS_LOADING });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors"
  };

  const requestUrl = `${BASE_URL}music/album/getsongs?id=${albumId}`;

  axios
    .get(requestUrl, config)
    .then(res => {
      let result = [];
      res.data.forEach(song => {
        //let obj = JSON.parse(str);
        // to solve FTP blockage from the browser
        song.file = getFromHttpInsteadOfFtp(song.file);
        song.artist.image = getFromHttpInsteadOfFtp(song.artist.image);

        result.push(song);
      });
      dispatch({
        type: SONGS_LOADED,
        payload: result
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
        type: SONGS_LOADING_FAILED
      });
    });
};
*/
