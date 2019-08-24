import { returnErrors, createMessage } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig } from "../utils";

import {
  HISTORY_LOADED,
  HISTORY_LOADING,
  HISTORY_LOADING_FAILED
} from "./types";

//songs history of the user
export const loadSongsHistory = () => (dispatch, getState) => {
  const { user, isAuthenticated } = getState().auth;
  if (isAuthenticated && user !== {} && user !== null) {
    dispatch({ type: HISTORY_LOADING });

    const requestUrl = `${BASE_URL}music/song/gethistory?userId=${
      getState().auth.user.id
    }`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.GET))
      .then(res => {
        res.json().then(response => {
          dispatch({
            type: HISTORY_LOADED,
            payload: response
          });
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(
          returnErrors(
            "Something went wrong when trying to get songs history information",
            err.status
          )
        );
        dispatch({
          type: HISTORY_LOADING_FAILED
        });
      });
  } else {
    dispatch(createMessage("Please log in to see your history"));
  }
};

export const addSongToHistory = song => (dispatch, getState) => {
  const user = getState().auth.user;

  if (user !== undefined && user !== null) {
    const requestUrl = `${BASE_URL}music/song/historyadd?userId=${
      user.id
    }&songId=${song.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
      .then(data => dispatch(createMessage("history added")))
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error));
      });
  }
};
