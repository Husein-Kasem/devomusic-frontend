import {
  PLAY_SONG,
  STOP_SONG,
  PAUSE_SONG,
  PLAY_GROUP_OF_SONGS,
  PLAY_SONG_AND_KEEP_QUEUE,
  UNPAUSE_SONG,
  PLAY_SONG_WITHOUT_CHANGING_QUEUE
} from "./types";
import { returnErrors } from "./messages";
import { BASE_URL, REQUEST_METHODES } from "../constants";
import { getFetchHeaderConfig } from "../utils";
//const baseUrl = "";

const convertSongToNeededFormate = song => {
  return song && song.musicSrc
    ? song
    : song && song.artist
    ? {
        id: song.id,
        name: song.name,
        singer: song.artist.name,
        cover: song.artist.image,
        musicSrc: song.file
      }
    : {
        id: 0,
        name: "",
        singer: "",
        cover: "",
        musicSrc: ""
      };
};

// PLAY SONG
export const playSong = (song, user) => dispatch => {
  dispatch({
    type: PLAY_SONG,
    payload: convertSongToNeededFormate(song)
  });

  // adding the song to the history of the user
  if (user !== undefined && user !== null) {
    const requestUrl = `${BASE_URL}music/song/historyadd?userId=${
      user.id
    }&songId=${song.id}`;

    fetch(requestUrl, getFetchHeaderConfig(REQUEST_METHODES.POST))
      .then(data => {})
      .catch(error => {
        console.error(error);
        dispatch(returnErrors(error));
      });
  }
};

export const playSongAndKeepQueue = song => dispatch => {
  dispatch({
    type: PLAY_SONG_AND_KEEP_QUEUE,
    payload: convertSongToNeededFormate(song)
  });
};

export const unpauseSong = () => dispatch => {
  dispatch({
    type: UNPAUSE_SONG
  });
};

export const playSongWithoutChangingQueue = song => dispatch => {
  dispatch({
    type: PLAY_SONG_WITHOUT_CHANGING_QUEUE,
    payload: convertSongToNeededFormate(song)
  });
};

// PLAY group of songs
export const playGroupOfSongs = songs => (dispatch, getState) => {
  let tmpSongs = [];
  if (songs !== null && songs !== [] && songs.length > 0) {
    songs.forEach(song => {
      tmpSongs.push(convertSongToNeededFormate(song));
    });

    dispatch({
      type: PLAY_GROUP_OF_SONGS,
      payload: tmpSongs
    });
  } else {
    dispatch(returnErrors("does not contain any songs", ""));
  }
};

// PAUSE SONG
export const pauseSong = () => dispatch => {
  dispatch({
    type: PAUSE_SONG
  });
};

// STOP SONG
export const stopSong = () => dispatch => {
  dispatch({
    type: STOP_SONG
  });
};
