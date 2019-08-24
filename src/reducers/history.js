import {
    HISTORY_LOADED,
    HISTORY_LOADING,
    HISTORY_LOADING_FAILED
  } from "../actions/types";
  
  const initialState = {
    isLoading: false,
    data: null
  };
  //reducer for the history component
  export default function(state = initialState, action) {
    switch (action.type) {
      case HISTORY_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case HISTORY_LOADED:
        return {
          ...state,
          isLoading: false,
          data: action.payload
        };
      case HISTORY_LOADING_FAILED:
        return {
          ...state,
          isLoading: false,
          data: null
        };
      default:
        return state;
    }
  }
  