import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { getAllNonFriends, updateUser } from "../../redux/userReducer/actions";
import { MiniCard_Friends } from "./MiniCard";

export const NonFriends = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  const nonFriends = useSelector((store) => store.userReducer.nonFriends);
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");

  // console.log(token, nonFriends);
  useEffect(() => {
    if (token) {
      dispatch(getAllNonFriends(token));
    }
  }, []);

  function addRequestHandler(id, receiversRequest) {
    // console.log(id, receiversRequest);
    if (token) {
      if (!receiversRequest.includes(loggedInUser._id)) {
        receiversRequest.push(loggedInUser._id);
        dispatch(updateUser(id, { requests: receiversRequest }, token, toast,'request'));
      }
    }
  }

  return (
    <>
      {nonFriends.length > 0 ? (
        nonFriends.map((friend, i) => {
          return (
            <MiniCard_Friends
              key={i}
              friend={friend}
              addRequestHandler={addRequestHandler}
              userId={loggedInUser._id}
            />
          );
        })
      ) : (
        <h3>Failed To Load Users</h3>
      )}
    </>
  );
};
