import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Divider,
  Center,
  Text,
} from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import React from "react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai";
const MiniCard_Friends = ({ userId, friend, addRequestHandler }) => {
  return (
    <Card
      maxW="md"
      mb="1rem"
      borderRadius="lg"
      overflow="hidden"
      boxShadow={"md"}
      p="1rem"
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap="1rem"
        alignItems="center"
      >
        <Avatar size="md" name={friend.name} src={friend.profileImage} />
        <Center height="50px">
          <Divider orientation="vertical" />
        </Center>
        <CardBody flexGrow={1} p={0}>
          <Flex
            mb={2}
            justifyContent="space-between"
            alignItems="center"
            w="100%"
          >
            <Heading size="sm" fontWeight="500">
              {friend.name}
            </Heading>
            {!friend.requests.includes(userId) ? (
              <Button
                variant="outline"
                size="sm"
                colorScheme="primary"
                onClick={() => addRequestHandler(friend._id, friend.requests)}
              >
                Add Friend
              </Button>
            ) : (
              <Button colorScheme="primary" size="sm" disabled>
                Friend Request Sent
              </Button>
            )}
          </Flex>
          <Text noOfLines={2} isTruncated>
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
      <Card maxW="md" px="4px" borderRadius="none" boxShadow="none">
        <Flex justify="space-between" align="center">
          <Avatar size="md" name={friend.name} src={friend.profileImage} />
          <Box flexGrow={1} px={4}>
            <Heading size="sm" textAlign={"left"} fontWeight={"500"}>
              {friend.name}
            </Heading>
          </Box>
          <Flex gap={2} justifyContent="flex-end" alignItems="center">
            {" "}
            <Button
              colorScheme="primary.500"
              size="xs"
              onClick={() => acceptRequestHandler(friend._id)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              colorScheme="primary"
              size="xs"
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
          <Avatar src={friend.profileImage} mr={"1rem"} />
          <Center height="50px">
            <Divider orientation="vertical" />
          </Center>
          <Flex justifyContent="space-between" alignItems="center" flexGrow={1}>
            <Heading
              ml="1rem"
              size="sm"
              justifySelf="flex-start"
              fontWeight="500"
            >
              {friend.name}
            </Heading>
            <ChatIcon cursor={"pointer"} />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export { MiniCard_Request, MiniCard_Friends, FriendCard };
