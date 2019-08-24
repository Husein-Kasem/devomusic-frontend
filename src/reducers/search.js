import {
  SEARCH_ALBUMS_LOADED,
  SEARCH_ALBUMS_LOADING,
  SEARCH_ALBUMS_LOADING_FAILED,
  SEARCH_SONGS_LOADED,
  SEARCH_SONGS_LOADING, 
  SEARCH_SONGS_LOADING_FAILED,
  SEARCH_PLAYLISTS_LOADED,
  SEARCH_PLAYLISTS_LOADING,
  SEARCH_PLAYLISTS_LOADING_FAILED,
  SEARCH_ARTISTS_LOADED,
  SEARCH_ARTISTS_LOADING,
  SEARCH_ARTISTS_LOADING_FAILED,
  SEARCH_COMMONS_LOADED,
  SEARCH_COMMONS_LOADING,
  SEARCH_COMMONS_LOADING_FAILED
} from "../actions/types";

const initialState = {
  isAlbumsLoading: false,
  isSongsLoading: false,
  isPlaylistsLoading: false,
  isArtistsLoading: false,
  isCommonsLoading: false,
  searchAlbums: [],
  searchSongs: [],
  searchPlaylists: [],
  searchArtists: [],
  searchCommons: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALBUMS_LOADING:
      return {
        ...state,
        isAlbumsLoading: true
      };
    case SEARCH_ALBUMS_LOADED:
      return {
        ...state,
        isAlbumsLoading: false,
        searchAlbums: action.payload
      };
    case SEARCH_ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isAlbumsLoading: false,
        searchAlbums: null
      };
    case SEARCH_SONGS_LOADING:
      return {
        ...state,
        isSongsLoading: true
      };
    case SEARCH_SONGS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        searchSongs: action.payload
      };
    case SEARCH_SONGS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        searchSongs: null
      };
    case SEARCH_PLAYLISTS_LOADING:
      return {
        ...state,
        isPlaylistLoading: true
      };
    case SEARCH_PLAYLISTS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        searchPlaylists: action.payload
      };
    case SEARCH_PLAYLISTS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        searchPlaylists: null
      };
    case SEARCH_ARTISTS_LOADING:
      return {
        ...state,
        isArtistsLoading: true
      };
    case SEARCH_ARTISTS_LOADED:
      return {
        ...state,
        isArtistsLoading: false,
        searchArtists: action.payload
      };
    case SEARCH_ARTISTS_LOADING_FAILED:
      return {
        ...state,
        isArtistsLoading: false,
        searchArtists: null
      };
    case SEARCH_COMMONS_LOADING:
      return {
        ...state,
        isCommonsLoading: true
      };
    case SEARCH_COMMONS_LOADED:
      return {
        ...state,
        isCommonsLoading: false,
        searchCommons: action.payload
      };
    case SEARCH_COMMONS_LOADING_FAILED:
      return {
        ...state,
        isCommonsLoading: false,
        searchCommons: null
      };
    default:
      return state;
  }
}
