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
import axios from "axios";

export const updateUser =
  (id, userObj, token, toast, type) => async (dispatch) => {
    try {
      dispatch({ type: POST_REQUEST_LOADING });
      // Make a patch request using Axios to update the user
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/update/${id}`,
        userObj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (type == "request") {
        dispatch({ type: POST_REQUEST_SUCCESS, payload: id });
        toast({
          title: "Friend Request Sent",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (type == "accept") {
        dispatch({ type: POST_ACCEPTREQUEST_SUCCESS, payload: id });
        toast({
          title: "Friend Request Accepted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (type === "reject") {
        dispatch({ type: POST_REJECTREQUEST_SUCCESS, payload: id });
        toast({
          title: "Friend Request Rejected",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      dispatch({ type: POST_REQUEST_ERROR });
      console.log(error);
      // Handle any errors that occur during the request
      // For example, dispatch an action to handle the error
      // dispatch(updateUserFailure(error));
    }
  };

export const addToFriend=(id, userId, token) => async(dispatch)=>{
  try {
    dispatch({ type: POST_REQUEST_LOADING });
    // Make a patch request using Axios to update the user
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/addFriend/${id}`,
      userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
  } catch(error) {
    console.log(error);
  }
}
export const getAllNonFriends = (token) => async (dispatch) => {
  dispatch({ type: GET_NONFRIEND_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/notfriends`,
      config
    );
    // console.log(response.data);

    const users = response.data.notFriends;
    users.forEach((user) => {
      user.profileImage = `${process.env.REACT_APP_API_URL}/${user.profileImage}`;
    });
    console.log(users);
    dispatch({ type: GET_NONFRIEND_SUCCESS, payload: users });
  } catch (error) {
    console.log("Error fetching user data:", error);
    dispatch({ type: GET_NONFRIEND_ERROR });
  }
};

export const getRequestsUsers = (token) => async (dispatch) => {
  dispatch({ type: GET_REQUESTSUSER_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/requests`,
      config
    );
    console.log(response.data);

    const users = response.data.requestUsers;
    users.forEach((user) => {
      user.profileImage = `${process.env.REACT_APP_API_URL}/${user.profileImage}`;
    });
    console.log(users);
    dispatch({ type: GET_REQUESTSUSER_SUCCESS, payload: users });
  } catch (error) {
    console.log("Error fetching user data:", error);
    dispatch({ type: GET_REQUESTSUSER_ERROR });
  }
};
