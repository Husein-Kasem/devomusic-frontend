import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RELOAD_USER_LOADED,
  RELOAD_USER_LOADING,
  RELOAD_USER_LOADING_FAILED,
  USERNAME_SUCCESSFULLY_CHANGED
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: {},
  successfulRegistration: false,
  isReloading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RELOAD_USER_LOADED:
      return {
        ...state,
        isReloading: false,
        user: action.payload
      };
    case RELOAD_USER_LOADING:
      return {
        ...state,
        isReloading: true
      };
    case RELOAD_USER_LOADING_FAILED:
      return {
        ...state,
        isReloading: true
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      };
    case REGISTER_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        successfulRegistration: true
      };
    case USERNAME_SUCCESSFULLY_CHANGED:
      return {
        ...state,
        user: action.payload
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        successfulRegistration: false
      };
    default:
      return state;
  }
}
