import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/authReducer/actions";
import { useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";

export const Account = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  const user = useSelector((store) => store.authReducer.loggedInUser);

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token, toast));
    }
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.profileImage} alt={user.name} />
        </div>
      ) : (
        <Heading as="h2" size="lg" mb={4}>
          No User data available
        </Heading>
      )}
    </div>
  );
};
