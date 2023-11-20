import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Carousel } from "../components/Feed/SingleRecipeCarousel";
import { BiShare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Contribution from "../components/Charts/Contribution";
import MostLikes from "../components/Charts/MostLikes";
import VegNonVegChart from "../components/Charts/VegNonVeg";
import Cuisines from "../components/Charts/Cusines";
import { Reveal } from "../components/common/Reveal";

const initialData = {
  tabOne: true,
  tabTwo: false,
  tabThree: false,
  tabFour: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "tabOne":
      return {
        ...state,
        tabOne: true,
        tabTwo: false,
        tabThree: false,
        tabFour: false,
      };
    case "tabTwo":
      return {
        ...state,
        tabOne: false,
        tabTwo: true,
        tabThree: false,
        tabFour: false,
      };
    case "tabThree":
      return {
        ...state,
        tabOne: false,
        tabTwo: false,
        tabThree: true,
        tabFour: false,
      };
    case "tabFour":
      return {
        ...state,
        tabOne: false,
        tabTwo: false,
        tabThree: false,
        tabFour: true,
      };
    default:
      return state;
  }
};

const Admin = () => {
  // const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialData);
  const hanldeTab = (tab) => {
    dispatch({ type: tab });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(recipe);

  const [nav, setNav] = useState("expanded");

  const handleNavbarToggle = () => {
    console.log(nav);
    setNav((prevState) =>
      prevState === "expanded" ? "minimized" : "expanded"
    );
  };

  const handleDeleteRecipe = (id) => {
    console.log(id);
  };

  // Get all users
  useEffect(() => {
    // setLoading(true)
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQyNjk4N2FlODJkZDg4M2VmZGNmMTAiLCJpYXQiOjE2OTkwMDU5NzF9.2BbpIwnPrvYyP2BY48EDBEVgdq8WaebKYtaXZ0KHgh0`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/getAllUsers/admin`, config)
      .then((res) => {
        setUser(res.data);
        // setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get all recipes
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQyNjk4N2FlODJkZDg4M2VmZGNmMTAiLCJpYXQiOjE2OTkwMDU5NzF9.2BbpIwnPrvYyP2BY48EDBEVgdq8WaebKYtaXZ0KHgh0`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/recipe/getAllRecipe`, config)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <>
      <SidebarContainer
        style={{ marginLeft: nav === "expanded" ? "0px" : "-180px" }}
      >
        <SidebarNav>
          <SidebarNavItem>
            <NavbarToggle id="navbar-toggle">
              <Text
                fontFamily={"Kaushan Script"}
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
            </NavbarToggle>
            <Hamburger navbar={handleNavbarToggle} />
          </SidebarNavItem>
          <SidebarNavItem onClick={() => hanldeTab("tabOne")}>
            <a>Dashboard </a>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M13 9V3h8v6h-8ZM3 13V3h8v10H3Zm10 8V11h8v10h-8ZM3 21v-6h8v6H3Z"
              />
            </svg>
          </SidebarNavItem>
          <SidebarNavItem onClick={() => hanldeTab("tabTwo")}>
            <a className="">All Users </a>
            <svg
              width="30"
              height="30"
              viewBox="0 0 15 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M5.5 0a3.499 3.499 0 1 0 0 6.996A3.499 3.499 0 1 0 5.5 0Zm-2 8.994a3.5 3.5 0 0 0-3.5 3.5v2.497h11v-2.497a3.5 3.5 0 0 0-3.5-3.5h-4Zm9 1.006H12v5h3v-2.5a2.5 2.5 0 0 0-2.5-2.5Z"
              />
              <path
                fill="#fff"
                d="M11.5 4a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5Z"
              />
            </svg>
          </SidebarNavItem>
          <SidebarNavItem onClick={() => hanldeTab("tabThree")}>
            <a>All Recipes </a>
            <svg
              width="30"
              height="30"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M4 1.5a.5.5 0 0 0-1 0v3a2.5 2.5 0 0 0 2 2.45v7.55a.5.5 0 0 0 1 0V6.95A2.5 2.5 0 0 0 8 4.5v-3a.5.5 0 0 0-1 0v3a1.5 1.5 0 0 1-1 1.415V1.5a.5.5 0 0 0-1 0v4.415A1.5 1.5 0 0 1 4 4.5v-3Zm7 13V8H9.5a.5.5 0 0 1-.5-.5v-4c0-.663.326-1.283.771-1.729C10.217 1.326 10.837 1 11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0Z"
              />
            </svg>
          </SidebarNavItem>
          <SidebarNavItem onClick={() => navigate("/")}>
            <a>Log out </a>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#fff"
                d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
              />
            </svg>
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContainer>
      <ADMIN>
        <div className="tabs">
          <div className="tab-content">
            {/* Dashboard */}
            <div
              style={{ width: "100%" }}
              className={state.tabOne ? "active" : "noShow"}
            >
              <Center>
                <Box p={7} textAlign="center">
                  <Box
                    maxW="xl"
                    mx="auto"
                    p={10}
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="md"
                  >
                    <Heading as="h1" size="lg">
                      Welcome to Dashboard
                    </Heading>
                    <Text mb={0}>Hello Admin, welcome to your dashboard!</Text>
                  </Box>
                </Box>
              </Center>
              <Flex flexWrap="wrap" justifyContent="space-between">
                <Box
                  flex="1"
                  maxW="lg"
                  bg="red.500"
                  p="3"
                  m="4"
                  borderRadius="md"
                  textAlign="center"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#ffffff"
                      fill-rule="evenodd"
                      d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5H8Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {user?.length}
                  </Text>
                  <Text fontSize="lg" color="white">
                    User registered
                  </Text>
                </Box>
                <Box
                  flex="1"
                  maxW="lg"
                  bg="yellow.500"
                  p="3"
                  m="4"
                  borderRadius="md"
                  textAlign="center"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#ffffff"
                      d="M0 192c0-35.3 28.7-64 64-64h1.6C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64h1.6c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256h457.2c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1l-1.8 14.5c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z"
                    />
                  </svg>
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    {recipe?.length}
                  </Text>
                  <Text fontSize="lg" color="white">
                    Total Recipes
                  </Text>
                </Box>
              </Flex>
              <Box borderWidth="1px" borderRadius="lg" boxShadow="md" m={4}>
                <Contribution user={user} />
              </Box>
              <Box borderWidth="1px" borderRadius="lg" boxShadow="md" m={4}>
                <MostLikes recipe={recipe} />
              </Box>
              <Flex borderWidth="1px" borderRadius="lg" boxShadow="md" m={4}>
                <VegNonVegChart recipeData={recipe} />
                <Cuisines recipes={recipe} />
              </Flex>
            </div>
            {/* All Users */}
            <div className={state.tabTwo ? "active" : "noShow"}>
              {user?.length > 0 &&
                user.map((ele, indx) => (
                  <Card m={5} maxW="" key={indx + Date.now()}>
                    <CardHeader>
                      <Flex my={0} gap={3}>
                        <Avatar
                          size="lg"
                          name={ele?.name}
                          src={`${process.env.REACT_APP_API_URL}/${ele?.profileImage}`}
                        />
                        <Flex flexDir={"column"} textAlign={"left"}>
                          <Heading size={"md"} fontWeight={"bold"}>
                            {ele?.name}
                          </Heading>
                          <Text size={"sm"}>City: {ele?.city}</Text>
                          <Text size={"sm"}>Email: {ele?.email}</Text>
                        </Flex>
                      </Flex>
                    </CardHeader>
                    <CardBody>
                      <Stack textAlign={"left"} mt="1" spacing="3">
                        <Heading size="md">Bio: </Heading>
                        <Text>{ele?.bio}</Text>
                        <Accordion allowMultiple>
                          <AccordionItem>
                            <h2>
                              <AccordionButton>
                                <Box
                                  as="span"
                                  fontWeight={"bold"}
                                  flex="1"
                                  textAlign="left"
                                  p={"5"}
                                >
                                  <Heading size="md">See friends:</Heading>
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                              {ele?.friends.length === 0 ? (
                                <Text>No friends!</Text>
                              ) : (
                                ele?.friends.map((e, index) => (
                                  <Box mx={9} my={2} key={index + Date.now()}>
                                    <Flex my={0} gap={3}>
                                      <Avatar
                                        size="lg"
                                        name={e?.name}
                                        src={`${process.env.REACT_APP_API_URL}/${e?.profileImage}`}
                                      />
                                      <Flex
                                        flexDir={"column"}
                                        textAlign={"left"}
                                      >
                                        <Text fontWeight={"bold"}>
                                          {e?.name}
                                        </Text>
                                        <Text>{e?.city}</Text>
                                      </Flex>
                                    </Flex>
                                  </Box>
                                ))
                              )}
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Heading size="md">Recipes posted by user: </Heading>
                        <HStack overflowX={"scroll"}>
                          {ele?.recipes?.length === 0 ? (
                            <Text>No posts yet!</Text>
                          ) : (
                            ele?.recipes.map((e, index) => (
                              <Box key={index + Date.now()}>
                                <Image
                                  height={"200px"}
                                  width={"200px"}
                                  src={`${process.env.REACT_APP_API_URL}/${e?.images[0]}`}
                                />
                                <Text fontWeight={"bold"}>{e?.title}</Text>
                              </Box>
                            ))
                          )}
                        </HStack>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => navigate(`/user/${ele._id}`)}
                        >
                          View User
                        </Button>
                        <Button variant="ghost" colorScheme="red">
                          Delete User
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            {/* All Recipes */}
            <div className={state.tabThree ? "active" : "noShow"}>
              <DIV>
                {recipe?.length > 0 &&
                  recipe.map((ele, index) => (
                    <Card key={index}>
                      <Box borderWidth="0" borderRadius="md" overflow="hidden">
                        <CardHeader>
                          <Flex my={3} gap={3}>
                            <Avatar
                              size="lg"
                              name={ele?.userId?.name}
                              src={`${process.env.REACT_APP_API_URL}/${ele?.userId?.profileImage}`}
                            />
                            <Flex flexDir={"column"} textAlign={"left"}>
                              <Text fontWeight={"bold"}>
                                {ele?.userId?.name}
                              </Text>
                              <Text>{ele?.userId?.city}</Text>
                            </Flex>
                          </Flex>
                          <Carousel height={"300px"} images={ele?.images} />
                        </CardHeader>
                        <Box p="1rem">
                          <Heading fontSize="2xl" fontWeight="bold">
                            {ele.title}
                          </Heading>
                          <Tag my={3}>{ele?.cuisine[0]}</Tag>
                          <Text fontSize="md">{ele.description}</Text>
                          <Flex mt={3} flexWrap="wrap" gap={3}>
                            {ele?.tags?.length > 0 &&
                              ele?.tags.map((e, index) => (
                                <Tag key={index}>{e}</Tag>
                              ))}
                          </Flex>
                          <CardFooter
                            px="0"
                            justify="flex-start"
                            gap="1rem"
                            flexWrap="wrap"
                            sx={{
                              "& > button": {
                                minW: "136px",
                              },
                            }}
                          >
                            <Button
                              flex={{ base: "1", md: "0.25" }}
                              variant="outline"
                              leftIcon={<BiShare />}
                              onClick={() => navigate(`/recipe/${ele._id}`)}
                            >
                              View Recipe
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={() => onOpen(ele._id)} // Pass the recipe ID to onOpen
                            >
                              Delete Recipe
                            </Button>
                            {/* Deleting Alert message */}
                            <AlertDialog
                              isOpen={isOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={onClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Delete Recipe
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    Are you sure? You can't undo this action
                                    afterwards.
                                  </AlertDialogBody>

                                  <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                      Cancel
                                    </Button>
                                    <Button
                                      colorScheme="red"
                                      onClick={(id) => handleDeleteRecipe(id)}
                                      ml={3}
                                    >
                                      Delete
                                    </Button>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </CardFooter>
                        </Box>
                      </Box>
                    </Card>
                  ))}
              </DIV>
            </div>
          </div>
        </div>
      </ADMIN>
    </>
  );
};

export default Admin;

const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(
      1,
      1fr
    ); /* 1 column on screens up to 768px wide */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(
      2,
      1fr
    ); /* 2 columns on screens between 769px and 1024px wide */
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* 3 columns on screens wider than 1024px */
  }
`;

const ADMIN = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap");

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* width: 100vw; */
  padding: 0 10%;
  font-family: "Raleway", sans-serif;
  font-size: 20px;

  .noShow {
    display: none;
  }

  .tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    padding: 10px 30px 30px 17%;
    background: #fff;
    /* overflow: hidden; */
  }
  .tabs .tab-header {
    float: left;
    width: 180px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    border-right: 1px solid #ccc;
    padding: 50px 0px;
  }
  /* .tabs .tab-header > div {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #888;
    cursor: pointer;
    padding-left: 10px;
  }
  .tabs .tab-header > div:hover,
  .tabs .tab-header > div.active {
    color: #00acee;
  }
  .tabs .tab-header div i {
    display: inline-block;
    margin-left: 10px;
    margin-right: 5px;
  }
  .tabs .tab-content {
    position: relative;
    height: 100%;
    overflow-y: scroll;
  }
  .tabs .tab-content > div > i {
    display: inline-block;
    width: 50px;
    height: 50px;
    background: #555;
    color: #f5f5f5;
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    line-height: 50px;
    border-radius: 50%;
  }
  .tabs .tab-content > div {
    position: absolute;
    text-align: center;
    padding: 40px 20px;
    top: -200%;
    transition: all 500ms ease-in-out;
  }
  .tabs .tab-content > div.active {
    top: 0px;
  }

  .tabs .tab-indicator {
    position: absolute;
    width: 4px;
    height: 50px;
    background: #00acee;
    left: 198px;
    top: 80px;
  } */
`;

const SidebarContainer = styled.div`
  color: #fff;
  background: #2b2b2d;
  width: 250px;
  max-width: 250px;
  height: 100%;
  float: left;
  position: fixed;
  z-index: 1000;
  display: block;
  transition: margin 1s;
  flex: 1;
  top: 0;
`;

const NavbarToggle = styled.a`
  /* background-color: blue; */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  /* padding: 0 20px; */
  align-items: center;
`;

const SidebarNav = styled.ul`
  display: block;
  float: left;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  a {
    /* padding-left: 20px; */
    font-size: 16px;
    text-decoration: none;
    color: #fff;
    float: left;
    text-decoration: none;
    width: 100%;
    height: 70px;
    line-height: 25px;
    padding: 20px;

    /* vertical-align: center; */
  }
  &:hover {
    background: #121213;
    transition: background 0.5s;
  }
`;

const Hamburger = ({ navbar }) => {
  return (
    <HAMBURGER>
      <input onChange={navbar} id="checkbox" type="checkbox" />
      <label class="toggle" for="checkbox">
        <div id="bar1" class="bars"></div>
        <div id="bar2" class="bars"></div>
        <div id="bar3" class="bars"></div>
      </label>
    </HAMBURGER>
  );
};

const HAMBURGER = styled.div`
  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition-duration: 0.3s;
  }

  .bars {
    width: 90%;
    height: 4px;
    background-color: rgb(253, 255, 243);
    border-radius: 5px;
    transition-duration: 0.3s;
  }

  /* #checkbox:checked + .toggle .bars {
  margin-left: 13px;
} */

  #checkbox:checked + .toggle #bar2 {
    transform: translateY(14px) rotate(60deg);
    margin-left: 0;
    transform-origin: right;
    transition-duration: 0.3s;
    z-index: 2;
  }

  #checkbox:checked + .toggle {
    gap: 10px;
  }

  #checkbox:checked + .toggle #bar1 {
    transform: translateY(28px) rotate(-60deg);
    transition-duration: 0.3s;
    transform-origin: left;
    z-index: 1;
  }

  #checkbox:checked + .toggle {
    transform: rotate(-90deg);
  }
  /* #checkbox:checked + .toggle #bar3 {
  transform: rotate(90deg);
  transition-duration: .3s;
  transform-origin:right;
} */
`;


const LOADER = styled.div`
  position: fixed;
  top: 50%;
  left : 50%;
  transform: translate(-50%, -50%);
  border: 4px solid rgba(0, 0, 0, 1);
  border-left-color: transparent;
  border-radius: 50%;
  margin-bottom : 50px;



  border: 4px solid rgba(0, 0, 0, 1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;



  border: 4px solid rgba(0, 0, 0, 1);
  border-left-color: transparent;
  width: 36px;
  height: 36px;
  animation: spin89345 1s linear infinite;


@keyframes spin89345 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
`