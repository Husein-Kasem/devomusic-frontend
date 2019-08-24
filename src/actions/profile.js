import { returnErrors } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import {
  PROFILE_SONG_LOADED,
  PROFILE_SONG_LOADING_FAILED,
  PROFILE_SONG_LOADING,
  PROFILE_ALBUM_LOADED,
  PROFILE_ALBUM_LOADING,
  PROFILE_ALBUM_LOADING_FAILED
} from "./types";
import { getFetchHeaderConfig } from "../utils";

export const loadProfileSongCount = userId => dispatch => {
  if (userId) {
    dispatch({
      type: PROFILE_SONG_LOADING
    });

    const requestUrl = `${BASE_URL}music/song/getcount?userId=${userId}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET)).then(res => {
      res
        .json()
        .then(response => {
          console.log(response);
          dispatch({
            type: PROFILE_SONG_LOADED,
            payload: response
          });
        })
        .catch(err => {
          console.log(err);
          dispatch(
            returnErrors(
              "Something went wrong when trying to get the count of songs in the profile section",
              err.status
            )
          );
          dispatch({
            type: PROFILE_SONG_LOADING_FAILED
          });
        });
    });
  }
};

export const loadProfileAlbumCount = userId => dispatch => {
  if (userId) {
    dispatch({
      type: PROFILE_ALBUM_LOADING
    });

    const requestUrl = `${BASE_URL}music/album/getcount?userId=${userId}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET)).then(res => {
      res
        .json()
        .then(response => {
          console.log(response);
          dispatch({
            type: PROFILE_ALBUM_LOADED,
            payload: response
          });
        })
        .catch(err => {
          console.log(err);
          dispatch(
            returnErrors(
              "Something went wrong when trying to get the count of songs in the profile section",
              err.status
            )
          );
          dispatch({
            type: PROFILE_ALBUM_LOADING_FAILED
          });
        });
    });
  }
};
