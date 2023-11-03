import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getUserData } from "../redux/authReducer/actions";

export const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const token = localStorage.getItem("token") || "";
  const user = useSelector((store) => store.authReducer.loggedInUser);
  
  useEffect(() => {
    if (!user && token) {
      dispatch(getUserData(token, toast));
    }
  }, []);
  return <div>Home</div>;
};
