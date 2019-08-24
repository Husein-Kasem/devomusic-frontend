/*import {
    MYACCOUNT_CHANGE_PASSWORD_LOADED,
    MYACCOUNT_CHANGE_PASSWORD_LOADING,
    MYACCOUNT_CHANGE_PASSWORD_LOADEDING_FAILED
  } from "../actions/types";
  
  const initialState = {
    isLoading: false,
    

    
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case MYACCOUNT_CHANGE_PASSWORD_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case MYACCOUNT_CHANGE_PASSWORD_LOADED:
        return {
          ...state,
          isLoading: true
          numberOfAlbums: action.payload
        };
      case MYACCOUNT_CHANGE_PASSWORD_LOADEDING_FAILED:
        return {
          ...state,
          isCountLoading: false,
          numberOfSongs: null,
          isAlbumCountLoading: false,
          numberOfAlbums: null
        };
       
      default:
        return state;
    }
  }
  */