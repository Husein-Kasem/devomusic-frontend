import {
  ALBUMS_LOADED,
  ALBUMS_LOADING,
  ALBUMS_LOADING_FAILED,
  HOME_ALBUMS_LOADED,
  HOME_ALBUMS_LOADING,
  HOME_ALBUMS_LOADING_FAILED
} from "../actions/types";

const initialState = {
  isLoading: false,
  isHomeLoading: false,
  data: [],
  homeAlbums: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ALBUMS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ALBUMS_LOADED:
      return {
        ...state,
        isLoading: false,
        data: action.payload
      };
    case ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        data: null
      };
    case HOME_ALBUMS_LOADING:
      return {
        ...state,
        isHomeLoading: true
      };
    case HOME_ALBUMS_LOADED:
      return {
        ...state,
        isHomeLoading: false,
        homeAlbums: action.payload
      };
    case HOME_ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isHomeLoading: false,
        homeAlbums: null
      };
    default:
      return state;
  }
}
