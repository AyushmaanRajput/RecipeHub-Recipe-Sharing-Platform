import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { MiniCard_Request } from "./MiniCard";
import { addToFriend, getRequestsUsers, updateUser } from "../../redux/userReducer/actions";

export const Requests = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.userReducer.requests);
  const friends = useSelector((store) => store.userReducer.friends);
  const nonFriends = useSelector((store) => store.userReducer.nonFriends);

  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);

  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");

  useEffect(() => {
    dispatch(getRequestsUsers(token));
  }, []);
  // console.log(requests, token);

  function acceptRequestHandler(id) {
    const requestIds = requests.map((request) => request._id);
    const friendIds = friends.map((friend) => friend._id);
    const updatedRequests = requestIds.filter((requestId) => requestId !== id);
    const updatedFriends = [...friendIds];
    dispatch(
      updateUser(
        loggedInUser._id,
        { requests: updatedRequests, friends: updatedFriends },
        token,
        toast,
        "accept"
      )
    );
    dispatch(
      addToFriend(
        id,
        loggedInUser._id,
        token,
      )
    );
  }

  function rejectRequestHandler(id) {
    const requestIds = requests.map((request) => request._id);
    const updatedRequests = requestIds.filter((requestId) => requestId !== id);
    dispatch(
      updateUser(id, { requests: updatedRequests }, token, toast, "reject")
    );
  }

  return (
    <div>
      {requests.length > 0 ? (
        requests.map((req, i) => {
          return (
            <MiniCard_Request
              friend={req}
              key={i}
              acceptRequestHandler={acceptRequestHandler}
              rejectRequestHandler={rejectRequestHandler}
            />
          );
        })
      ) : (
        <Heading as={"h3"}>You Have No Pending Requests</Heading>
      )}
    </div>
  );
};
