import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { logoutUser } from "../../redux/authReducer/actions";
import { Container } from "./Container";

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
        width={"min(80rem,100%)"}
        mx="auto"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem 1.5rem"
        color="text"
      >
        <Box as={Link} to="/" fontSize="2xl" fontWeight="bold">
          Recipe<span style={{}}>Hub</span>
        </Box>
        <Box>
          <Button as={Link} to="/" variant="link" color="text" mx="2">
            Home
          </Button>
          <Button as={Link} to="/explore" variant="link" color="text" mx="2">
            Explore
          </Button>
          <Button as={Link} to="/feed" variant="link" color="text" mx="2">
            Feed
          </Button>
          <Button as={Link} to="/account" variant="link" color="text" mx="2">
            Account
          </Button>
        </Box>
        <Box>
          {isAuth ? (
            <>
              <Button
                variant="link"
                color="text"
                mr="0"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="link" color="text" mr="4">
                Login
              </Button>
              <Button
                as={Link}
                to="/signup"
                variant="link"
                color="text"
                mr="0"
              >
                SingUp
              </Button>
            </>
          )}
        </Box>
      </Flex>
    </Container>
  );
};
