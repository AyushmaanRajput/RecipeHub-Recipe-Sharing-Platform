import {
  ADDRECIPE_ERROR,
  ADDRECIPE_LOADING,
  ADDRECIPE_SUCCESS,
  GETRECIPE_ERROR,
  GETRECIPE_LOADING,
  GETRECIPE_SUCCESS,
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
