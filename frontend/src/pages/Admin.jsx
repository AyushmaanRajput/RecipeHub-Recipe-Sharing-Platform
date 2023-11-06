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
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { Carousel } from "../components/Feed/SingleRecipeCarousel";
import { BiShare } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

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

  const handleDeleteRecipe = (id) => {
    console.log(id);
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/recipe/deleteMyRecipe/${id}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     navigate("/admin");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // Get all users
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/getAllUsers/admin`, config)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get all recipes
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
    <ADMIN>
      <div className="tabs">
        <div className="tab-header">
          <div
            onClick={() => hanldeTab("tabOne")}
            className={state.tabOne ? "active" : null}
          >
            Step 1
          </div>
          <div
            onClick={() => hanldeTab("tabTwo")}
            className={state.tabTwo ? "active" : null}
          >
            Users
          </div>
          <div
            onClick={() => hanldeTab("tabThree")}
            className={state.tabThree ? "active" : null}
          >
            All recipes
          </div>
          <div
            onClick={() => hanldeTab("tabFour")}
            className={state.tabFour ? "active" : null}
          >
            Logout
          </div>
        </div>
        <div className="tab-indicator"></div>
        <div className="tab-content">
          <div className={state.tabOne ? "active" : "noShow"}>
            <Center>
              <Box p={4} textAlign="center">
                <Box
                  maxW="xl"
                  mx="auto"
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <Heading as="h1" size="lg">
                    Welcome to Dashboard
                  </Heading>
                  <Text mb={0}>
                    Hello Ayushmaan Rajput, welcome to your dashboard!
                  </Text>
                </Box>
              </Box>
            </Center>
            <Flex flexWrap="wrap" justifyContent="space-between">
              <Box
                flex="1"
                maxW="lg"
                bg="blue.500"
                p="3"
                m="4"
                borderRadius="md"
                textAlign="center"
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="4" fill="white" />
                  <path
                    fill="white"
                    d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z"
                  />
                </svg>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  32
                </Text>
                <Text fontSize="lg" color="white">
                  Page views
                </Text>
              </Box>
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
                  width="48"
                  height="48"
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
                  width="48"
                  height="48"
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
          </div>

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
                        <Text fontWeight={"bold"}>{ele?.name}</Text>
                        <Text>{ele?.city}</Text>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Stack textAlign={"left"} mt="1" spacing="3">
                      <Heading size="md">Bio: </Heading>
                      <Text>{ele?.bio}</Text>
                      <Heading size="md">Friends: </Heading>
                      {ele?.friends.length > 0 &&
                        ele?.friends.map((e, index) => (
                          <Box mx={9} my={2} key={index + Date.now()}>
                            <Flex my={0} gap={3}>
                              <Avatar
                                size="lg"
                                name={e?.name}
                                src={`${process.env.REACT_APP_API_URL}/${e?.profileImage}`}
                              />
                              <Flex flexDir={"column"} textAlign={"left"}>
                                <Text fontWeight={"bold"}>{e?.name}</Text>
                                <Text>{e?.city}</Text>
                              </Flex>
                            </Flex>
                          </Box>
                        ))}
                      <Heading size="md">Recipes by users: </Heading>
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
                      <Button variant="solid" colorScheme="blue">
                        Buy now
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        Add to cart
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ))}
          </div>
          {/* This will show all recipes */}
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
                            <Text fontWeight={"bold"}>{ele?.userId?.name}</Text>
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

          <div className={state.tabFour ? "active" : "noShow"}>
            <h2>This is contact section</h2>
          </div>
        </div>
      </div>
    </ADMIN>
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
  width: 100vw;
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
    padding: 30px 20px;
    background: #f5f5f5;
    box-shadow: 5px 5px 10px 5px #ccc;
    overflow: hidden;
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
  .tabs .tab-header > div {
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
  }
`;
