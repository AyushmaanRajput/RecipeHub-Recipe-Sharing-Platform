import {
  ADDRECIPE_ERROR,
  ADDRECIPE_LOADING,
  ADDRECIPE_SUCCESS,
  GETRECIPE_ERROR,
  GETRECIPE_LOADING,
  GETRECIPE_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  recipes: [],//recipes of current user
  friendRecipes:[]//recipes of friends of current user for the feed
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADDRECIPE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError:true,
      }
    case ADDRECIPE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError:false,
      }
    case ADDRECIPE_SUCCESS:
      return {
        ...state,
        isLoading:false,
        isError:false,
        recipes:[...state.recipes, action.payload]
      }
      case GETRECIPE_ERROR:
        return {
          ...state,
          isLoading: false,
          isError:true,
        }
      case GETRECIPE_LOADING:
        return {
          ...state,
          isLoading: true,
          isError:false,
        }
      case GETRECIPE_SUCCESS:
        return {
          ...state,
          isLoading:false,
          isError:false,
          friendRecipes:[...state.friendRecipes, action.payload]
        }
    default:
    return state;
  }
};
