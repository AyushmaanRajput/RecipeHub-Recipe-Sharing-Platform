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
import axios from "axios";
export const createUser = (newUser, toast, navigate) => async (dispatch) => {
  dispatch({ type: CREATE_USER_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/signup`,
      newUser,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // Handle the server response here
    console.log(response);
    dispatch({ type: CREATE_USER_SUCCESS });
    toast({
      title: "SignUp successfull",
      description: `${response.data.message}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_USER_ERROR });
    toast({
      title: "SignUp Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  }
};

export const loginUser = (userObj, toast, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_LOADING });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      userObj,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the server response here
    // console.log(response);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.token });
      toast({
        title: "Login Successfull",
        description: `${response.data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
      
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_USER_ERROR });
    toast({
      title: "Login Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

export const logoutUser = (token, toast, navigate) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      config
    );
    localStorage.removeItem("token");
    toast({
      title: "Logout Successfull",
      description: `${response.data.message}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  } catch (error) {
    console.log("Error whlie logging out:", error);
    toast({
      title: "Logout Failed",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }

  dispatch({ type: RESET });
};

//get data of the loggedin user
export const getUserData = (token, toast) => async (dispatch) => {
  dispatch({ type: GET_LOGGEDUSER_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/users`,
      config
    );
    console.log(response.data.user);

    const userWithProfileImage = response.data.user;
    userWithProfileImage.profileImage = `${process.env.REACT_APP_API_URL}/${userWithProfileImage.profileImage}`;
    dispatch({ type: GET_LOGGEDUSER_SUCCESS, payload: userWithProfileImage });
  } catch (error) {
    console.log("Error fetching user data:", error);
    dispatch({ type: GET_LOGGEDUSER_ERROR });
    toast({
      title: "Failed To Load User Details",
      description: `${error.response.data.message}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

// update user details
export const updateUserDetails = (id, newData, headers, toast) => (dispatch) => {
  axios
    .patch(`${process.env.REACT_APP_API_URL}/users/update/${id}`, newData, {
      headers: headers,
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: UPDATE_USER_DETAILS,
        payload: res.data,
      });
      toast({
        title: "Your data was successfully updated",
        description: `${res.data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    })
    .catch((err) => {
      toast({
        title: "Your data was successfully updated",
        description: `${err.response.data.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

// Get user recipes
export const getUserRecipes = (id, token) => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  axios.get(`${process.env.REACT_APP_API_URL}/recipe/getMyRecipe?populate=recipes`, config)
    .then((response) => {
      console.log(response.data.recipes);
      dispatch({
        type: "GET_USER_RECIPES",
        payload: response.data.recipes,
      });
    })
    .catch((error) => {
      console.error('Error fetching user recipes:', error);
    });
};

export const getAllRecipes = (token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(`${process.env.REACT_APP_API_URL}/recipe/getAllRecipe`, config).then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.log(err)
  })
}

// export const getUserDetailsForSingleRecipe = (token, id) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, config)
//     .then((res) => {
//       return res.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }