import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem 1.5rem"
      bg="#333"
      color="white"
    >
      <Box as={Link} to="/" fontSize="2xl" fontWeight="bold">
        LOGO
      </Box>
      <Box>
        <Button as={Link} to="/" variant="link" color="white" mx="2">
          Home
        </Button>
        <Button as={Link} to="/feed" variant="link" color="white" mx="2">
          Feed
        </Button>
        <Button as={Link} to="/explore" variant="link" color="white" mx="2">
          Explore
        </Button>
        <Button as={Link} to="/account" variant="link" color="white" mx="2">
          Account
        </Button>
      </Box>
      <Box>
        <Button as={Link} to="/login" variant="link" color="white" mr="4">
          Login
        </Button>
        <Button as={Link} to="/signup" variant="link" color="white" mr="0">
          SingUp
        </Button>
      </Box>
    </Flex>
  );
};
