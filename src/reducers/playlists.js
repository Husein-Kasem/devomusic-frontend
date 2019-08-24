import {
  PLAYLISTS_LOADED,
  PLAYLISTS_LOADING,
  PLAYLISTS_LOADING_FAILED,
  PLAYLIST_SONGS_LOADED,
  PLAYLIST_SONGS_LOADING,
  PLAYLIST_SONGS_LOADING_FAILED,
  OPEN_CHOOSE_PLAYLIST_DIALOG,
  CLOSE_CHOOSE_PLAYLIST_DIALOG,
  USER_PLAYLISTS_LOADED,
  USER_PLAYLISTS_LOADING,
  USER_PLAYLISTS_LOADING_FAILED,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST
} from "../actions/types.js";

const initialState = {
  isLoading: false,
  playlists: [],
  isSongsLoading: false,
  songs: [],
  isChoosePlaylistDialogOpen: false,
  chosenSong: {},
  isUserPlaylistsLoading: false,
  userPlaylists: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYLISTS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case PLAYLISTS_LOADED:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload
      };
    case PLAYLISTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        playlists: null
      };
    case USER_PLAYLISTS_LOADING:
      return {
        ...state,
        isUserPlaylistsLoading: true
      };
    case USER_PLAYLISTS_LOADED:
      return {
        ...state,
        isUserPlaylistsLoading: false,
        userPlaylists: action.payload
      };
    case USER_PLAYLISTS_LOADING_FAILED:
      return {
        ...state,
        isUserPlaylistsLoading: false,
        userPlaylists: null
      };
    case PLAYLIST_SONGS_LOADING:
      return {
        ...state,
        isSongsLoading: true
      };
    case PLAYLIST_SONGS_LOADED:
      return {
        ...state,
        isSongsLoading: false,
        songs: action.payload
      };
    case PLAYLIST_SONGS_LOADING_FAILED:
      return {
        ...state,
        isSongsLoading: false,
        songs: null
      };
    case OPEN_CHOOSE_PLAYLIST_DIALOG:
      return {
        ...state,
        isChoosePlaylistDialogOpen: true,
        chosenSong: action.payload
      };
    case CLOSE_CHOOSE_PLAYLIST_DIALOG:
      return {
        ...state,
        isChoosePlaylistDialogOpen: false,
        chosenSong: {}
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        userPlaylists: [...state.userPlaylists, action.payload]
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        userPlaylists: state.userPlaylists.filter(
          playlist => playlist.id !== action.payload.id
        )
      };
    default:
      return state;
  }
}
