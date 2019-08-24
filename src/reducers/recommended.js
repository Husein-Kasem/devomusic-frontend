import {
  RECOMMENDED_ALBUMS_LOADED,
  RECOMMENDED_ALBUMS_LOADING,
  RECOMMENDED_ALBUMS_LOADING_FAILED,
  RECOMMENDED_SONGS_LOADED,
  RECOMMENDED_SONGS_LOADING, 
  RECOMMENDED_SONGS_LOADING_FAILED,
  RECOMMENDED_PLAYLISTS_LOADED,
  RECOMMENDED_PLAYLISTS_LOADING,
  RECOMMENDED_PLAYLISTS_LOADING_FAILED
} from "../actions/types";

const initialState = {
  isAlbumsLoading: false,
  isSongsLoading: false,
  isPlaylistsLoading: false,
  recommendedAlbums: [],
  recommendedSongs: [],
  recommendedPlaylists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECOMMENDED_ALBUMS_LOADING:
      return {
        ...state,
        isAlbumsLoading: true
      };
    case RECOMMENDED_ALBUMS_LOADED:
      return {
        ...state,
        isAlbumsLoading: false,
        recommendedAlbums: action.payload
      };
    case RECOMMENDED_ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isAlbumsLoading: false,
        recommendedAlbums: null
      };
    case RECOMMENDED_SONGS_LOADING:
      return {
        ...state,
        isSongsLoading: true
      };
    case RECOMMENDED_SONGS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        recommendedSongs: action.payload
      };
    case RECOMMENDED_SONGS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        recommendedSongs: null
      };
      case RECOMMENDED_PLAYLISTS_LOADING:
      return {
        ...state,
        isPlaylistLoading: true
      };
    case RECOMMENDED_PLAYLISTS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        recommendedPlaylists: action.payload
      };
    case RECOMMENDED_PLAYLISTS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        recommendedPlaylists: null
      };
    default:
      return state;
  }
}
