import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import React from "react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai";
const MiniCard_Friends = ({ userId, friend, addRequestHandler }) => {
  return (
    <Card
      maxW="md"
      mb="10px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex direction={{ base: "column", sm: "row" }} alignItems="center" p={4}>
        <Avatar size="md" name={friend.name} src={friend.profileImage} />
        <CardBody ml={4}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md">{friend.name}</Heading>
            {!friend.requests.includes(userId) ? (
              <Button
                colorScheme="teal"
                size="sm"
                onClick={() => addRequestHandler(friend._id, friend.requests)}
              >
                Add Friend
              </Button>
            ) : (
              <Button colorScheme="teal" size="sm" disabled>
                Friend Request Sent
              </Button>
            )}
          </Flex>
          <Text mt={2} noOfLines={2} isTruncated>
            {friend.bio.slice(0, 40) + "..."}
          </Text>
        </CardBody>
      </Flex>
    </Card>
  );
};

const MiniCard_Request = ({
  friend,
  acceptRequestHandler,
  rejectRequestHandler,
}) => {
  return (
    <div>
      <Card maxW="md" p="10px" borderRadius="none" boxShadow="none">
        <Flex justify="space-between" align="center">
          <Avatar size="md" name={friend.name} src={friend.profileImage} />
          <Box flexGrow={1} px={4}>
            <Heading size="sm" textAlign={"left"}>
              {friend.name}
            </Heading>
          </Box>
          <Flex gap={2} justifyContent="flex-end" alignItems="center">
            {" "}
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => acceptRequestHandler(friend._id)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              size="sm"
              onClick={() => rejectRequestHandler(friend._id)}
            >
              Reject
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

const FriendCard = ({ friend }) => {
  return (
    <div>
      <Card maxW="md" p="1rem" borderRadius="4px" boxShadow="none" bor>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Avatar src={friend.profileImage} />
          <Flex justifyContent="space-between" alignItems="center" flexGrow={1}>
            <Heading ml="20px" size="sm" justifySelf="flex-start">
              {friend.name}
            </Heading>
            <ChatIcon cursor={'pointer'}/>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export { MiniCard_Request, MiniCard_Friends, FriendCard };
