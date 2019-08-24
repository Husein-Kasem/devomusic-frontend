import {
  PLAY_SONG,
  STOP_SONG,
  ADD_SONGS_TO_QUEUE,
  ADD_SONG_TO_QUEUE,
  REMOVE_SONG_FROM_QUEUE,
  CLEAR_PLAYER_QUEUE,
  PAUSE_SONG,
  PLAY_GROUP_OF_SONGS,
  PLAY_SONG_AND_KEEP_QUEUE,
  UNPAUSE_SONG,
  PLAY_SONG_WITHOUT_CHANGING_QUEUE
} from "../actions/types";

const initialState = {
  isPlaying: false,
  playingSong: {},
  playerQueue: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAY_SONG:
      let queue = [];
      queue.push(action.payload);
      return {
        ...state,
        isPlaying: true,
        playingSong: action.payload,
        playerQueue: queue
      };
    case PLAY_SONG_WITHOUT_CHANGING_QUEUE:
      return {
        ...state,
        isPlaying: true,
        playingSong: action.payload
      };
    case PAUSE_SONG:
      return {
        ...state,
        isPlaying: false
      };
    case UNPAUSE_SONG:
      return {
        ...state,
        isPlaying: true
      };
    case STOP_SONG:
      return {
        ...state,
        isPlaying: false,
        playingSong: {},
        playerQueue: []
      };
    case PLAY_GROUP_OF_SONGS:
      return {
        ...state,
        isPlaying: true,
        playingSong:
          action.payload.length > 0
            ? action.payload[0]
            : {
                id: 0,
                name: "",
                singer: "",
                cover: "",
                musicSrc: ""
              },
        playerQueue: action.payload
      };
    case PLAY_SONG_AND_KEEP_QUEUE:
      return {
        ...state,
        isPlaying: true,
        playingSong: action.payload,
        playerQueue: [...state.playerQueue, action.payload]
      };
    case ADD_SONGS_TO_QUEUE:
    case ADD_SONG_TO_QUEUE:
      return {
        ...state,
        playerQueue: [...state.playerQueue, action.payload]
      };
    case REMOVE_SONG_FROM_QUEUE:
    case CLEAR_PLAYER_QUEUE:
      return {
        ...state
      };

    default:
      return state;
  }
}
