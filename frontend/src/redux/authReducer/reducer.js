import {
  CREATE_USER_LOADING,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  POST_DISLIKE_SUCCESS,
  POST_LIKE_SUCCESS,
  RESET,
  UPDATE_USER_DETAILS,
} from "./actionTypes";
import {
  GET_LOGGEDUSER_LOADING,
  GET_LOGGEDUSER_SUCCESS,
  GET_LOGGEDUSER_ERROR,
} from "./actionTypes";
const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token: null,
  loggedInUser: null,
  recipes : null
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_USER_LOADING:
      return {
        ...initState,
        isLoading: true,
      };
    case CREATE_USER_ERROR:
      return {
        ...initState,
        isError: true,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...initState,
      };
    case LOGIN_USER_LOADING:
      return {
        ...initState,
        isLoading: true,
      };
    case LOGIN_USER_ERROR:
      return {
        ...initState,
        isError: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...initState,
        isAuth: true,
        token: action.payload,
      };
    case RESET:
      return {
        ...initState,
      };
    case GET_LOGGEDUSER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_LOGGEDUSER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_LOGGEDUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        loggedInUser: action.payload,
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case POST_LIKE_SUCCESS:
      let newLikedRecipes = [...state.loggedInUser.likedRecipes];
      if (!state.loggedInUser.likedRecipes.includes(action.payload)) {
        newLikedRecipes.push(action.payload);
      }
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, likedRecipes: newLikedRecipes },
      };
    case POST_DISLIKE_SUCCESS:
      let newLikedRecipes1 = [...state.loggedInUser.likedRecipes].filter(
        (rec) => rec != action.payload
      );
      return {
        ...state,
        loggedInUser: { ...state.loggedInUser, likedRecipes: newLikedRecipes1 },
      };
    case "GET_USER_RECIPES" : {
      return {
      ...state,
        recipes: action.payload,
      };
    }
    default:
      return state;
  }
};
