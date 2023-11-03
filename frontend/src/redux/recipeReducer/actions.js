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
  UPDATE_RECIPE_SUCCESS,
} from "./actionTypes";

import axios from "axios";

export const addNewRecipe =
  (token, recipe, toast, navigate) => async (dispatch) => {
    dispatch({ type: ADDRECIPE_LOADING });
    console.log(recipe);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/recipe/add`,
        recipe,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      dispatch({ type: ADDRECIPE_SUCCESS, payload: response.data.recipe }); //add payload after successful post
      toast({
        title: "Recipe Created Successfully",
        description: `${response.data.message}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      dispatch({ type: ADDRECIPE_ERROR });
      toast({
        title: "Failed To Add Recipe",
        description: `${err.response.data.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

export const getFeed = (token) => async (dispatch) => {
  dispatch({ type: GET_FEED_LOADING });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/recipe/feed`,
      config
    );
    // console.log(response.data);

    const recipes = response.data.feed;

    for (let recipe of recipes) {
      recipe.images = recipe.images.map((image) => {
        return `${process.env.REACT_APP_API_URL}/${image}`;
      });

      // Update profileImage URL for the user in the recipe
      recipe.userId.profileImage = `${process.env.REACT_APP_API_URL}/${recipe.userId.profileImage}`;
    }

    // console.log(recipes);
    dispatch({ type: GET_FEED_SUCCESS, payload: recipes });
  } catch (error) {
    console.log("Error fetching user data:", error);
    dispatch({ type: GET_FEED_ERROR });
  }
};

export const updateRecipe = (id, token, recipe, toast) => async (dispatch) => {
  dispatch({ type: ADDRECIPE_LOADING });
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/recipe/update/${id}`,
      recipe,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    // dispatch({
    //   type: UPDATE_RECIPE_SUCCESS,
    //   payload: response.data.updatedRecipe,
    // });
    dispatch(getFeed(token));
  } catch (err) {
    console.log("failed to update recipe", err);
    dispatch({ type: ADDRECIPE_ERROR });
  }
};
