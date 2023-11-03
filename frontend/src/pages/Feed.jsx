import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import FeedCard from "../components/Feed/FeedCard";
import { FriendCard, MiniCard_Chef } from "../components/Feed/MiniCard";
import styled from "@emotion/styled";
import { BsSearch } from "react-icons/bs";
import { NonFriends } from "../components/Feed/NonFriends";
import { Requests } from "../components/Feed/Requests";

export const Feed = () => {
  let arr = new Array(10).fill(1);
  return (
    <DIV>
      <Flex spacing={8} direction="row">
        <Box
          p={5}
          w="20%"
          h="90vh"
          overflowY="scroll"
          className="scroll"
          backgroundColor={"white"}
          boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
        >
          <InputGroup mb="10px">
            <InputLeftElement pointerEvents="none">
              <BsSearch color="gray.300" />
            </InputLeftElement>
            <Input type="search" placeholder="Search" />
          </InputGroup>
          <Heading size={"md"}>FRIENDS</Heading>
          {arr.map((_, index) => {
            return <FriendCard key={index} />;
          })}
        </Box>
        <Box p={5} w="50%" h="90vh" overflowY="scroll" className="scroll">
          {arr.map((_, index) => {
            return <FeedCard key={index} />;
          })}
        </Box>
        <Box
          p={5}
          w="30%"
          h="80vh"
          spacing="10px"
          overflowY="scroll"
          className="scroll"
        >
          <Heading size={"md"} mb={"2rem"}>
            Find New Friends
          </Heading>
          <NonFriends></NonFriends>
          <Divider my={10} />
          <Heading size={"md"} mb={"2rem"}>
            People Who Want To Know You
          </Heading>
          <Requests></Requests>
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
