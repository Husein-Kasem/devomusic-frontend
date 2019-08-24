import {
    USERS_LOADED,
    USERS_LOADING,
    USERS_LOADING_FAILED,
    USER_ROLES_LOADED,
    USER_ROLES_LOADING,
    USER_ROLES_LOADING_FAILED
  } from "../actions/types";
  
  const initialState = {
    isUsersLoading: false,
    users: [],
    roles: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case USERS_LOADING:
        return {
          ...state,
          isUsersLoading: true
        };
      case USERS_LOADED:
        return {
          ...state,
          isUsersLoading: false,
          users: action.payload
        };
      case USERS_LOADING_FAILED:
        return {
          ...state,
          isUsersLoading: false,
          users: null
        };

      case USER_ROLES_LOADING:
        return {
          ...state,
          isRolesLoading: true
        };
      case USER_ROLES_LOADED:
        return {
          ...state,
          isRolesLoading: false,
          roles: action.payload
        };
      case USER_ROLES_LOADING_FAILED:
        return {
          ...state,
          isRolesLoading: false,
          roles: null
        };
      default:
        return state;
    }
  }
  