import {
  GET_NONFRIEND_LOADING,
  GET_NONFRIEND_ERROR,
  GET_NONFRIEND_SUCCESS,
  POST_REQUEST_ERROR,
  POST_REQUEST_LOADING,
  POST_REQUEST_SUCCESS,
  GET_REQUESTSUSER_ERROR,
  GET_REQUESTSUSER_SUCCESS,
  GET_REQUESTSUSER_LOADING,
  POST_ACCEPTREQUEST_ERROR,
  POST_ACCEPTREQUEST_LOADING,
  POST_ACCEPTREQUEST_SUCCESS,
  POST_REJECTREQUEST_ERROR,
  POST_REJECTREQUEST_LOADING,
  POST_REJECTREQUEST_SUCCESS,
} from "./actionTypes";

const initState = {
  isLoading: false,
  isError: false,
  nonFriends: [],
  requests: [],
  friends: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_NONFRIEND_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_NONFRIEND_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_NONFRIEND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        nonFriends: [...action.payload],
      };
    case POST_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case POST_REQUEST_SUCCESS:
      let filteredNonFriends = [...state.nonFriends].filter(
        (friend) => friend._id != action.payload
      );
      return {
        ...state,
        isLoading: false,
        isError: false,
        nonFriends: filteredNonFriends,
      };
    case GET_REQUESTSUSER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case GET_REQUESTSUSER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case GET_REQUESTSUSER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        requests: [...action.payload],
      };
    case POST_ACCEPTREQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_ACCEPTREQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_ACCEPTREQUEST_SUCCESS:
      let filteredRequests = [...state.requests].filter(
        (req) => req._id != action.payload
      );
      let addedFriends = [...state.friends];
      for (let i = 0; i < state.requests.length; i++) {
        if (state.requests[i]._id == action.payload) {
          addedFriends.push(state.requests[i]);
        }
      }
      return {
        ...state,
        isLoading: false,
        isError: false,
        requests: filteredRequests,
        friends: addedFriends,
      };
    case POST_REJECTREQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case POST_REJECTREQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case POST_REJECTREQUEST_SUCCESS:
      let newRequests = [...state.requests].filter(
        (req) => req._id != action.payload
      );
      let newNonFriends = [...state.nonFriends];
      for (let i = 0; i < state.requests.length; i++) {
        if (state.requests[i]._id == action.payload) {
          newNonFriends.push(state.requests[i]);
        }
      }
      return {
        ...state,
        isLoading: false,
        isError: false,
        requests: newRequests,
        nonFriends: newNonFriends,
      };
    default:
      return state;
  }
};
