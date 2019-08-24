import {
    GENRES_LOADED,
    GENRES_LOADING,
    GENRES_LOADING_FAILED,
    GENRES_ALBUMS_LOADED,
    GENRES_ALBUMS_LOADING,
    GENRES_ALBUMS_LOADING_FAILED
  } from "../actions/types";
  
  const initialState = {
    isLoading: false,
    isAlbumsLoading: false,
    genres: [],
    albums: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case GENRES_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case GENRES_LOADED:
        return {
          ...state,
          isLoading: false,
          genres: action.payload
        };
      case GENRES_LOADING_FAILED:
        return {
          ...state,
          isLoading: false,
          genres: null
        };
      case GENRES_ALBUMS_LOADING:
        return {
          ...state,
          isAlbumsLoading: true
        };
      case GENRES_ALBUMS_LOADED:
        return {
          ...state,
          isAlbumsLoading: false,
          albums: action.payload
        };
      case GENRES_ALBUMS_LOADING_FAILED:
        return {
          ...state,
          isAlbumsLoading: false,
          albums: null
        };
      default:
        return state;
    }
  }
  