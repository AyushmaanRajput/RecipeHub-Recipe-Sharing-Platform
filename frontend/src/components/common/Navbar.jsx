import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { logoutUser } from "../../redux/authReducer/actions";
import { Container } from "./Container";
import { FaBell } from "react-icons/fa";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
} from "@chakra-ui/react";
import { Notifications } from "./Notifications";

export const Navbar = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const token = useSelector((store) => store.authReducer.token);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logoutUser(token, toast, navigate));
  }

  return (
    <Container>
      <Flex
        mx="auto"
        as="nav"
        align="center"
        justifyContent="space-between"
        padding="0.5rem 1.5rem"
        background="white"
        color="text"
      >
        <Box display="flex" gap="1rem">
          <Text
            fontFamily={"Kaushan Script"}
            as={Link}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            mr="1rem"
          >
            Recipe
            <Text display="inline" color="primary.500">
              Hub
            </Text>
          </Text>
          <Button
            as={Link}
            to="/"
            variant="link"
            color="text"
            _hover={{ color: "primary.500" }}
          >
            Home
          </Button>
          <Button
            as={Link}
            to="/explore"
            variant="link"
            color="text"
            _hover={{ color: "primary.500" }}
          >
            Explore
          </Button>
          <Button
            as={Link}
            to="/feed"
            variant="link"
            color="text"
            _hover={{ color: "primary.500" }}
          >
            Feed
          </Button>
          <Button
            as={Link}
            to="/account"
            variant="link"
            color="text"
            _hover={{ color: "primary.500" }}
          >
            Account
          </Button>
        </Box>
        <Flex alignItem="center" gap="1rem">
          {isAuth ? (
            <>
              <Popover placement="top-end">
                <PopoverTrigger>
                  <Button
                    variant="link"
                    color="text"
                    opacity="0.8"
                    _hover={{
                      opacity: 1,
                      color: "primary.500",
                    }}
                  >
                    <FaBell size={24} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent zIndex={100000} position="relative">
                  <Box p="4">
                    <Notifications />
                  </Box>
                </PopoverContent>
              </Popover>
              <Button onClick={logoutHandler}>Logout</Button>
            </>
          ) : (
            <>
              <Button
                border={"1px solid"}
                borderColor={"secondary"}
                color="secondary"
                variant="outline"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>SingUp</Button>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
