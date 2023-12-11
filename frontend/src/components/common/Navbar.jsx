import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../redux/authReducer/actions";
import { Notifications } from "./Notifications";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const token = useSelector((store) => store.authReducer.token);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const address = useLocation();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("primary-500", "white");
  const borderColor = useColorModeValue("gray.200", "gray.900");
  const signInColor = useColorModeValue("gray.600", "gray.200");

  const logoutHandler = () => {
    dispatch(logoutUser(token, toast, navigate));
  };

  if(address.pathname === "/admin") {
    return 
  }

  return (
    <Box w="min(100%,80rem)" mx="auto">
      <Flex
        bg={bgColor}
        color={textColor}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            base: "flex-end",
          }}
        >
          <Text
            as={Link}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing={"1px"}
            fontFamily={"Kaushan Script"}
            color={textColor}
          >
            Recipe
            <Text display="inline" color="primary.500">
              Hub
            </Text>
          </Text>

          <Flex
            display={{ base: "none", md: "flex" }}
            ml={{ lg: 8, md: 4, base: 2 }}
          >
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-start"}
          direction={"row"}
          spacing={{ base: 2, md: 4 }}
          p={4}
        >
          {isAuth ? (
            <>
              <Popover trigger={"hover"} placement={"top-end"}>
                <PopoverTrigger>
                  <IconButton
                    variant="link"
                    color={textColor}
                    _hover={{
                      opacity: 1,
                      color: "primary.500",
                    }}
                    aria-label="Notifications"
                  >
                    <FaBell size={24} />
                  </IconButton>
                </PopoverTrigger>
                <PopoverContent zIndex={100000} position="relative">
                  <Box p="4">
                    <Notifications />
                  </Box>
                </PopoverContent>
              </Popover>
              <Button
                onClick={logoutHandler}
                size={{ lg: "lg", md: "md", base: "sm" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant={"outline"}
                size={{ lg: "lg", md: "md", base: "sm" }}
              >
                Login
              </Button>
              <Button
                size={{ lg: "lg", md: "md", base: "sm" }}
                as={Link}
                to="/signup"
              >
                SignUp
              </Button>
            </>
          )}
        </Stack>
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("text", "white");
  const linkHoverColor = useColorModeValue("primary.500", "teal.500");
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const token = useSelector((store) => store.authReducer.token);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("primary-500", "white");
  const borderColor = useColorModeValue("gray.200", "gray.900");
  const signInColor = useColorModeValue("gray.600", "gray.200");

  const logoutHandler = () => {
    dispatch(logoutUser(token, toast, navigate));
  };
  return (
    <Flex gap="1rem" alignItems={"center"}>
      <Flex gap="1rem" alignItems={"center"}>
        <Text
          as={Link}
          to="/explore"
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Explore
        </Text>
        <Text
          as={Link}
          to="/feed"
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Feed
        </Text>
        <Text
          as={Link}
          to="/account"
          color={linkColor}
          _hover={{
            textDecoration: "none",
            color: linkHoverColor,
          }}
        >
          Account
        </Text>
      </Flex>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={{ base: 2, md: 4 }}
      >
        {isAuth ? (
          <>
            <Popover trigger={"hover"} placement={"top-end"}>
              <PopoverTrigger>
                <IconButton
                  variant="link"
                  color={textColor}
                  _hover={{
                    opacity: 1,
                    color: "primary.500",
                  }}
                  aria-label="Notifications"
                >
                  <FaBell size={24} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent zIndex={100000} position="relative">
                <Box p="4">
                  <Notifications />
                </Box>
              </PopoverContent>
            </Popover>
            <Button
              onClick={logoutHandler}
              size={{ lg: "lg", md: "md", base: "sm" }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              as={Link}
              to="/login"
              variant={"outline"}
              size={{ lg: "lg", md: "md", base: "sm" }}
            >
              Login
            </Button>
            <Button
              size={{ lg: "lg", md: "md", base: "sm" }}
              as={Link}
              to="/signup"
            >
              SignUp
            </Button>
          </>
        )}
      </Stack>
    </Flex>
  );
};

const MobileNav = () => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack bg={bgColor} p={4} display={{ md: "none", base: "flex" }}>
      <MobileNavItem label="Explore" href={"/explore"} />
      <MobileNavItem label="Feed" href={"/feed"} />
      <MobileNavItem label="Account" href={"/account"} />
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Text
      py={2}
      as={Link}
      to={href ?? "#"}
      fontWeight={600}
      color={useColorModeValue("primary.500", "white")}
      _hover={{
        textDecoration: "none",
      }}
    >
      {label}
    </Text>
  );
};

export default Navbar;
