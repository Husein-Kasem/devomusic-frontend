import {
  PROFILE_SONG_LOADED,
  PROFILE_SONG_LOADING,
  PROFILE_SONG_LOADING_FAILED,
  PROFILE_ALBUM_LOADED,
  PROFILE_ALBUM_LOADING,
  PROFILE_ALBUM_LOADING_FAILED
} from "../actions/types";

const initialState = {
  isCountLoading: false,
  numberOfSongs: 0,
  isAlbumCountLoading: false,
  numberOfAlbums: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_SONG_LOADING:
      return {
        ...state,
        isCountLoading: true
      };
    case PROFILE_SONG_LOADED:
      return {
        ...state,
        isCountLoading: false,
        numberOfSongs: action.payload
      };
    case PROFILE_SONG_LOADING_FAILED:
      return {
        ...state,
        isCountLoading: false,
        numberOfSongs: null
      };
    case PROFILE_ALBUM_LOADING:
      return {
        ...state,
        isAlbumCountLoading: true
      };
    case PROFILE_ALBUM_LOADED:
      return {
        ...state,
        isAlbumCountLoading: false,
        numberOfAlbums: action.payload
      };
    case PROFILE_ALBUM_LOADING_FAILED:
      return {
        ...state,
        isAlbumCountLoading: false,
        numberOfAlbums: null
      };
    default:
      return state;
  }
}
