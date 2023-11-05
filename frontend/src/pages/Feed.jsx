import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserFeed } from "../components/Feed/UserFeed";
import { FriendCard, MiniCard_Chef } from "../components/Feed/MiniCard";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";
import { NonFriends } from "../components/Feed/NonFriends";
import { Requests } from "../components/Feed/Requests";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../redux/userReducer/actions";

export const Feed = () => {
  const dispatch = useDispatch();
  const friends = useSelector((store) => store.userReducer.friends);
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getFriends(token));
    }
  }, []);
  return (
    <DIV>
      <Flex spacing={8} direction="row">
        <Box
          p={5}
          w="26%"
          h="90vh"
          overflowY="scroll"
          className="scroll"
          backgroundColor={"white"}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
        >
          <Heading size={"md"} mb={"2rem"} textTransform="uppercase">
            People Who Want To Know You
          </Heading>
          <Requests></Requests>
          <Divider my={5} />
          <Heading size={"md"} mb="2rem" textTransform="uppercase">
            Your Friends
          </Heading>
          <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
              <BsSearch color="gray.300" />
            </InputLeftElement>
            <Input type="search" placeholder="Search" />
          </InputGroup>
          {friends.map((friend, index) => {
            return <FriendCard friend={friend} key={index} />;
          })}
        </Box>
        <UserFeed />
        <Box
          p={5}
          spacing="10px"
          overflowY="scroll"
          className="scroll"
          // bg="white"
          height="auto"
        >
          <Heading size={"md"} mb={"1rem"} textTransform="uppercase">
            Find New Friends
          </Heading>
          <NonFriends></NonFriends>
        </Box>
      </Flex>
    </DIV>
  );
};

const DIV = styled.div`
  background-color: #f7fbfc;
  .scroll::-webkit-scrollbar {
    display: none;
  }
`;
