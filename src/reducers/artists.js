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
  ARTIST_DETAILS_LOADING_FAILED,
} from "../actions/types";

const initialState = {
  isLoading: false,
  isAlbumsLoading: false,
  isDetailsLoading: false,
  isSongsLoading: false,
  artists: [],
  artistAlbums: [],
  artistSongs: [],
  artistDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ARTISTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ARTISTS_LOADED:
      return {
        ...state,
        isLoading: false,
        artists: action.payload
      };
    case ARTISTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        artists: null
      };
    case ARTIST_ALBUMS_LOADING:
      return {
        ...state,
        isAlbumsLoading: true
      };
    case ARTIST_ALBUMS_LOADED:
      return {
        ...state,
        isAlbumsLoading: false,
        artistAlbums: action.payload
      };
    case ARTIST_ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isAlbumsLoading: false,
        artistAlbums: null
      };
    case ARTIST_SONGS_LOADING:
      return {
        ...state,
        isSongsLoading: true
      };
    case ARTIST_SONGS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        artistSongs: action.payload
      };
    case ARTIST_SONGS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        artistSongs: null
      };
    
    case ARTIST_DETAILS_LOADING:
      return {
        ...state,
        isDetailsLoading: true
      };
    case ARTIST_DETAILS_LOADED:
      return {
        ...state,
        isDetailsLoading: false,
        artistDetails: action.payload
      };
    case ARTIST_DETAILS_LOADING_FAILED:
      return {
        ...state,
        isDetailsLoading: false,
        artistDetails: {}
      };
    default:
      return state;
  }
}
