import {
    INSCRIPTIONS_BY_MONTH_LOADED,
    INSCRIPTIONS_BY_MONTH_LOADING,
    INSCRIPTIONS_BY_MONTH_LOADING_FAILED,
    INSCRIPTIONS_BY_YEAR_LOADED,
    INSCRIPTIONS_BY_YEAR_LOADING,
    INSCRIPTIONS_BY_YEAR_LOADING_FAILED,
    GENDER_LOADED,
    GENDER_LOADING,
    GENDER_LOADING_FAILED,
    ROLE_LOADED,
    ROLE_LOADING,
    ROLE_LOADING_FAILED,
    AGE_LOADED,
    AGE_LOADING,
    AGE_LOADING_FAILED,
    COUNTRY_LOADED,
    COUNTRY_LOADING,
    COUNTRY_LOADING_FAILED,
    LISTENED_SONG_LOADED,
    LISTENED_SONG_LOADING_FAILED,
    LISTENED_SONG_LOADING,
    FAVORITE_SONG_STATS_LOADED,
    FAVORITE_SONG_STATS_LOADING,
    FAVORITE_SONG_STATS_LOADING_FAILED,
    FAVORITE_ALBUM_STATS_LOADED,
    FAVORITE_ALBUM_STATS_LOADING,
    FAVORITE_ALBUM_STATS_LOADING_FAILED
  } from "../actions/types";
  
  const initialState = {
    isInscriptionsByMonthLoading: false,
    inscriptionsByMonth: [],
    isInscriptionsByYearLoading: false,
    inscriptionsByYear: [],
    isGenderLoading: false,
    genderStats: [],
    isRoleLoading: false,
    roleStats: [],
    isAgeLoading: false,
    ageStats: [],
    isCountryLoading: false,
    countryStats: [],
    isListenedSongsLoading: false,
    listenedSongStats: [],
    isFavoriteSongsLoading: false,
    favoriteSongStats: [],
    isFavoriteAlbumsLoading: false,
    favoriteAlbumStats: []
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case INSCRIPTIONS_BY_MONTH_LOADING:
        return {
          ...state,
          isInscriptionsByMonthLoading: true
        };
      case INSCRIPTIONS_BY_MONTH_LOADED:
        return {
          ...state,
          isInscriptionsByMonthLoading: false,
          inscriptionsByMonth: action.payload
        };
      case INSCRIPTIONS_BY_MONTH_LOADING_FAILED:
        return {
          ...state,
          isInscriptionsByMonthLoading: false,
          inscriptionsByMonth: null
        };
      case INSCRIPTIONS_BY_YEAR_LOADING:
        return {
          ...state,
          isInscriptionsByYearLoading: true
        };
      case INSCRIPTIONS_BY_YEAR_LOADED:
        return {
          ...state,
          isInscriptionsByYearLoading: false,
          inscriptionsByYear: action.payload
        };
      case INSCRIPTIONS_BY_YEAR_LOADING_FAILED:
        return {
          ...state,
          isInscriptionsByYearLoading: false,
          inscriptionsByYear: null
        };
      case GENDER_LOADING:
        return {
          ...state,
          isGenderLoading: true
        };
      case GENDER_LOADED:
        return {
          ...state,
          isGenderLoading: false,
          genderStats: action.payload
        };
      case GENDER_LOADING_FAILED:
        return {
          ...state,
          isGenderLoading: false,
          genderStats: null
        };
      case ROLE_LOADING:
        return {
          ...state,
          isRoleLoading: true
        };
      case ROLE_LOADED:
        return {
          ...state,
          isRoleLoading: false,
          roleStats: action.payload
        };
      case ROLE_LOADING_FAILED:
        return {
          ...state,
          isRoleLoading: false,
          roleStats: null
        };
      case AGE_LOADING:
        return {
          ...state,
          isAgeLoading: true
        };
      case AGE_LOADED:
        return {
          ...state,
          isAgeLoading: false,
          ageStats: action.payload
        };
      case AGE_LOADING_FAILED:
        return {
          ...state,
          isAgeLoading: false,
          ageStats: null
        };
      case COUNTRY_LOADING:
        return {
          ...state,
          isCountryLoading: true
        };
      case COUNTRY_LOADED:
        return {
          ...state,
          isCountryLoading: false,
          countryStats: action.payload
        };
      case COUNTRY_LOADING_FAILED:
        return {
          ...state,
          isCountryLoading: false,
          countryStats: null
        };
      case LISTENED_SONG_LOADED:
        return {
          ...state,
          isListenedSongsLoading: false,
          listenedSongStats: action.payload
        };
      case LISTENED_SONG_LOADING:
        return {
          ...state,
          isListenedSongsLoading: true
        };
      case LISTENED_SONG_LOADING_FAILED:
        return {
          ...state,
          isListenedSongsLoading: false,
          listenedSongStats: null
        };
      case FAVORITE_SONG_STATS_LOADED:
        return {
          ...state,
          isFavoriteSongsLoading: false,
          favoriteSongStats: action.payload
        };
      case FAVORITE_SONG_STATS_LOADING:
        return {
          ...state,
          isFavoriteSongsLoading: true
        };
      case FAVORITE_SONG_STATS_LOADING_FAILED:
        return {
          ...state,
          isFavoriteSongsLoading: false,
          favoriteSongStats: null
        };
      case FAVORITE_ALBUM_STATS_LOADED:
        return {
          ...state,
          isFavoriteAlbumsLoading: false,
          favoriteAlbumStats: action.payload
        };
      case FAVORITE_ALBUM_STATS_LOADING:
        return {
          ...state,
          isFavoriteAlbumsLoading: true,
          favoriteAlbumStats: action.payload
        };
      case FAVORITE_ALBUM_STATS_LOADING_FAILED:
        return {
          ...state,
          isFavoriteAlbumsLoading: false,
          favoriteAlbumStats: null
        };
      default:
        return state;
    }
  }
  