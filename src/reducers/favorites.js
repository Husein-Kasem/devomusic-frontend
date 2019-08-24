import {
  FAVORITE_ALBUMS_LOADED,
  FAVORITE_ALBUMS_LOADING,
  FAVORITE_ALBUMS_LOADING_FAILED,
  FAVORITE_SONGS_LOADED,
  FAVORITE_SONGS_LOADING,
  FAVORITE_SONGS_LOADING_FAILED,
  FAVORITE_PLAYLISTS_LOADED,
  FAVORITE_PLAYLISTS_LOADING,
  FAVORITE_PLAYLISTS_LOADING_FAILED,
  ADD_SONG_TO_FAVORITES,
  REMOVE_SONG_FROM_FAVORITES,
  ADD_ALBUM_TO_FAVORITES,
  REMOVE_ALBUM_FROM_FAVORITES,
  ADD_PLAYLIST_TO_FAVORITES,
  REMOVE_PLAYLIST_FROM_FAVORITES
} from "../actions/types";

const initialState = {
  isAlbumsLoading: false,
  isSongsLoading: false,
  isPlaylistsLoading: false,
  favoriteAlbums: [],
  favoriteSongs: [],
  favoritePlaylists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FAVORITE_ALBUMS_LOADING:
      return {
        ...state,
        isAlbumsLoading: true
      };
    case FAVORITE_ALBUMS_LOADED:
      return {
        ...state,
        isAlbumsLoading: false,
        favoriteAlbums: action.payload
      };
    case FAVORITE_ALBUMS_LOADING_FAILED:
      return {
        ...state,
        isAlbumsLoading: false,
        favoriteAlbums: null
      };
    case FAVORITE_SONGS_LOADING:
      return {
        ...state,
        isSongsLoading: true
      };
    case FAVORITE_SONGS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        favoriteSongs: action.payload
      };
    case ADD_SONG_TO_FAVORITES:
      return {
        ...state,
        favoriteSongs: [...state.favoriteSongs, action.payload]
      };
    case REMOVE_SONG_FROM_FAVORITES:
      return {
        ...state,
        favoriteSongs: state.favoriteSongs.filter(
          song => song.id !== action.payload.id
        )
      };
    case ADD_ALBUM_TO_FAVORITES:
      return {
        ...state,
        favoriteAlbums: [...state.favoriteAlbums, action.payload]
      };
    case REMOVE_ALBUM_FROM_FAVORITES:
      return {
        ...state,
        favoriteAlbums: state.favoriteAlbums.filter(
          album => album.id !== action.payload.id
        )
      };
    case ADD_PLAYLIST_TO_FAVORITES:
      return {
        ...state,
        favoritePlaylists: [...state.favoritePlaylists, action.payload]
      };
    case REMOVE_PLAYLIST_FROM_FAVORITES:
      return {
        ...state,
        favoritePlaylists: state.favoritePlaylists.filter(
          playlist => playlist.id !== action.payload.id
        )
      };
    case FAVORITE_SONGS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        favoriteSongs: null
      };
    case FAVORITE_PLAYLISTS_LOADING:
      return {
        ...state,
        isPlaylistsLoading: true
      };
    case FAVORITE_PLAYLISTS_LOADED:
      return {
        ...state,
        isPlaylistsLoading: false,
        favoritePlaylists: action.payload
      };
    case FAVORITE_PLAYLISTS_LOADING_FAILED:
      return {
        ...state,
        isPlaylistsLoading: false,
        favoritePlaylists: null
      };

    default:
      return state;
  }
}
