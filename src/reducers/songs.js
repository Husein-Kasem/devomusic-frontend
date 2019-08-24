import {
  SONGS_LOADED,
  SONGS_LOADING,
  SONGS_LOADING_FAILED,
  HOME_SONGS_LOADED,
  HOME_SONGS_LOADING,
  HOME_SONGS_LOADING_FAILED
} from "../actions/types";

const initialState = {
  isLoading: false,
  isHomeLoading: false,
  data: [],
  homeSongs: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SONGS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SONGS_LOADED:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case SONGS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        data: []
      };
    case HOME_SONGS_LOADING:
      return {
        ...state,
        isHomeLoading: true
      };
    case HOME_SONGS_LOADED:
      return {
        ...state,
        isHomeLoading: false,
        homeSongs: action.payload
      };
    case HOME_SONGS_LOADING_FAILED:
      return {
        ...state,
        isHomeLoading: false,
        homeSongs: []
      };
    default:
      return state;
  }
}
