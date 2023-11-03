import {
  CREATE_USER_LOADING,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  LOGIN_USER_LOADING,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
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
    default:
      return state;
  }
};
