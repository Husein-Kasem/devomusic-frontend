import { BASE_URL, REQUEST_METHODES } from "../constants";
import {
  INSCRIPTIONS_BY_MONTH_LOADED,
  INSCRIPTIONS_BY_MONTH_LOADING,
  INSCRIPTIONS_BY_MONTH_LOADING_FAILED,
  INSCRIPTIONS_BY_YEAR_LOADED,
  INSCRIPTIONS_BY_YEAR_LOADING,
  INSCRIPTIONS_BY_YEAR_LOADING_FAILED,
  GENDER_LOADED,
  GENDER_LOADING,
  GENDER_LOADING_FAILED,
  ROLE_LOADED,
  ROLE_LOADING,
  ROLE_LOADING_FAILED,
  AGE_LOADED,
  AGE_LOADING,
  AGE_LOADING_FAILED,
  COUNTRY_LOADED,
  COUNTRY_LOADING,
  COUNTRY_LOADING_FAILED,
  LISTENED_SONG_LOADED,
  LISTENED_SONG_LOADING,
  LISTENED_SONG_LOADING_FAILED,
  FAVORITE_SONG_STATS_LOADED,
  FAVORITE_SONG_STATS_LOADING,
  FAVORITE_SONG_STATS_LOADING_FAILED,
  FAVORITE_ALBUM_STATS_LOADED,
  FAVORITE_ALBUM_STATS_LOADING,
  FAVORITE_ALBUM_STATS_LOADING_FAILED
} from "./types";
import { returnErrors } from "./messages";
import { getFetchHeaderConfig } from "../utils";

export const loadInscriptionsByMonth = year => (dispatch, getState) => {
  dispatch({ type: INSCRIPTIONS_BY_MONTH_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getinscriptionsbymonth?year=${year}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: INSCRIPTIONS_BY_MONTH_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get inscription statistics",
          err.status
        )
      );
      dispatch({
        type: INSCRIPTIONS_BY_MONTH_LOADING_FAILED
      });
    });
};

export const loadInscriptionsByYear = (yearStart, yearEnd) => (
  dispatch,
  getState
) => {
  dispatch({ type: INSCRIPTIONS_BY_YEAR_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getinscriptionsbyyear?yearStart=${yearStart}&yearEnd=${yearEnd}`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: INSCRIPTIONS_BY_YEAR_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get inscription statistics",
          err.status
        )
      );
      dispatch({
        type: INSCRIPTIONS_BY_YEAR_LOADING_FAILED
      });
    });
};


export const loadGenderStatistics = () => (dispatch, getState) => {
  dispatch({ type: GENDER_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getgenderstats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: GENDER_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to get gender statistics",
          err.status
        )
      );
      dispatch({
        type: GENDER_LOADING_FAILED
      });
    });
};

export const loadRoleStatistics = () => (dispatch, getState) => {
  dispatch({ type: ROLE_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getrolestats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: ROLE_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to role statistics",
          err.status
        )
      );
      dispatch({
        type: ROLE_LOADING_FAILED
      });
    });
};

export const loadAgeStatistics = () => (dispatch, getState) => {
  dispatch({ type: AGE_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getagestats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: AGE_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to age statistics",
          err.status
        )
      );
      dispatch({
        type: AGE_LOADING_FAILED
      });
    });
};

export const loadCountryStatistics = () => (dispatch, getState) => {
  dispatch({ type: COUNTRY_LOADING });

  const requestUrl = `${BASE_URL}auth/admin/getcountrystats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: COUNTRY_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to country statistics",
          err.status
        )
      );
      dispatch({
        type: COUNTRY_LOADING_FAILED
      });
    });
};

export const loadListenedSongStatistics = () => (dispatch, getState) => {
  dispatch({ type: LISTENED_SONG_LOADING });

  const requestUrl = `${BASE_URL}music/admin/getMostListenedSongStats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      console.log(res);
      res.json().then(response => {
        dispatch({
          type: LISTENED_SONG_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to listened song statistics",
          err.status
        )
      );
      dispatch({
        type: LISTENED_SONG_LOADING_FAILED
      });
    });
};

export const loadFavoriteSongStatistics = () => (dispatch, getState) => {
  dispatch({ type: FAVORITE_SONG_STATS_LOADING });

  const requestUrl = `${BASE_URL}music/admin/getMostFavoriteSongStats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: FAVORITE_SONG_STATS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to favorite song statistics",
          err.status
        )
      );
      dispatch({
        type: FAVORITE_SONG_STATS_LOADING_FAILED
      });
    });
};

export const loadFavoriteAlbumStatistics = () => (dispatch, getState) => {
  dispatch({ type: FAVORITE_ALBUM_STATS_LOADING });

  const requestUrl = `${BASE_URL}music/admin/getMostFavoriteAlbumStats`;

  fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
    .then(res => {
      res.json().then(response => {
        dispatch({
          type: FAVORITE_ALBUM_STATS_LOADED,
          payload: response
        });
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(
        returnErrors(
          "Something went wrong when trying to favorite album statistics",
          err.status
        )
      );
      dispatch({
        type: FAVORITE_ALBUM_STATS_LOADING_FAILED
      });
    });
};
