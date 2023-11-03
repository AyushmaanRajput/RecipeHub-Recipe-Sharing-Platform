import {
  ADDRECIPE_ERROR,
  ADDRECIPE_LOADING,
  ADDRECIPE_SUCCESS,
  GETRECIPE_ERROR,
  GETRECIPE_LOADING,
  GETRECIPE_SUCCESS,
  GET_FEED_ERROR,
  GET_FEED_LOADING,
  GET_FEED_SUCCESS,
  UPDATE_RECIPE_SUCCESS
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  recipes: [], //recipes of current user
  friendRecipes: [], //recipes of friends of current user for the feed
  feed:[]
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADDRECIPE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case ADDRECIPE_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case ADDRECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        recipes: [...state.recipes, action.payload],
      };
    case GET_FEED_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_FEED_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_FEED_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        feed: [...action.payload],
      };
    case UPDATE_RECIPE_SUCCESS:
      let newRecipes = [...state.recipes].map((rep)=>{
        if(rep._id ==action.payload._id){
          rep=action.payload;
        }
      })
      let newFeed =[...state.feed].map((rep)=>{
        if(rep._id ==action.payload._id){
          rep=action.payload;
        }
      })
      return {
        ...state,
        isLoading:false,
        isError:false,
        recipes: newRecipes,
        feed:newFeed
      }
    default:
      return state;
  }
};
