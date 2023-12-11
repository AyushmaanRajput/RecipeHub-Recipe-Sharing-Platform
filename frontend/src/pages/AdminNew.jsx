import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Image,
  Button,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  HStack,
  Tag,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { FaBell } from "react-icons/fa";
import { AiOutlineTeam, AiOutlineHome } from "react-icons/ai";
import { BsFolder2, BsCalendarCheck } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Contribution from "../components/Charts/Contribution";
import MostLikes from "../components/Charts/MostLikes";
import VegNonVegChart from "../components/Charts/VegNonVeg";
import Cuisines from "../components/Charts/Cusines";
import { Carousel } from "../components/Feed/SingleRecipeCarousel";
import { BiShare } from "react-icons/bi";

export default function AdminNew() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [user, setUser] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [section, setSection] = useState(1);
  const navigate = useNavigate();

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
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <Box
        display={{ base: "none", md: "unset" }}
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("inherit", "gray.700")}
        borderRightWidth="1px"
        w="60"
      >
        <Flex px="4" py="5" align="center">
          <Text
            as={Link}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing={"1px"}
            fontFamily={"Kaushan Script"}
          >
            Recipe
            <Text display="inline" color="primary.500">
              Hub
            </Text>
          </Text>
        </Flex>
        <Flex
          direction="column"
          as="nav"
          fontSize="md"
          color="gray.600"
          aria-label="Main Navigation"
        >
          <NavItem icon={AiOutlineHome} onClick={() => setSection(1)}>
            Dashboard
          </NavItem>
          <NavItem icon={AiOutlineTeam} onClick={() => setSection(2)}>
            Users
          </NavItem>
          <NavItem icon={BsFolder2} onClick={() => setSection(3)}>
            Recipes
          </NavItem>
          <NavItem icon={BsCalendarCheck} onClick={() => navigate("/")}>
            Logout
          </NavItem>
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          {/* <SidebarContent w="full" borderRight="none" /> */}
          <Box
            w="full"
            borderRight="none"
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg={useColorModeValue("white", "gray.800")}
            borderColor={useColorModeValue("inherit", "gray.700")}
            borderRightWidth="1px"
          >
            <Flex px="4" py="5" align="center">
              <Text
                as={Link}
                to="/"
                fontSize="2xl"
                fontWeight="bold"
                letterSpacing={"1px"}
                fontFamily={"Kaushan Script"}
              >
                Recipe
                <Text display="inline" color="primary.500">
                  Hub
                </Text>
              </Text>
            </Flex>
            <Flex
              direction="column"
              as="nav"
              fontSize="md"
              color="gray.600"
              aria-label="Main Navigation"
            >
              <NavItem icon={AiOutlineHome} onClick={() => setSection(1)}>
                Dashboard
              </NavItem>
              <NavItem icon={AiOutlineTeam} onClick={() => setSection(2)}>
                Users
              </NavItem>
              <NavItem icon={BsFolder2} onClick={() => setSection(3)}>
                Recipes
              </NavItem>
              <NavItem icon={BsCalendarCheck} onClick={() => navigate("/")}>
                Logout
              </NavItem>
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justifyContent={{ base: "space-between", md: "flex-end" }}
          w="full"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="sm"
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          />

          <Flex align="center">
            <Avatar
              ml="4"
              size="sm"
              name="Ahmad"
              src="https://avatars2.githubusercontent.com/u/37842853?v=4"
              cursor="pointer"
            />
          </Flex>
        </Flex>

        <Box
          as="main"
          p={14}
          minH="25rem"
          bg={useColorModeValue("auto", "gray.800")}
        >
          <div>
            <div className="tabs">
              <div className="tab-content">
                {section === 1 ? (
                  <div>
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
                          <Text mb={0}>
                            Hello Admin, welcome to your dashboard!
                          </Text>
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
                    <Box
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      m={4}
                    >
                      <Contribution user={user} />
                    </Box>
                    <Box
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      m={4}
                    >
                      <MostLikes recipe={recipe} />
                    </Box>
                    <Flex
                      borderWidth="1px"
                      borderRadius="lg"
                      boxShadow="md"
                      m={4}
                    >
                      <VegNonVegChart recipeData={recipe} />
                      <Cuisines recipes={recipe} />
                    </Flex>
                  </div>
                ) : section === 2 ? (
                  <div>
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
                                        <Heading size="md">
                                          See friends:
                                        </Heading>
                                      </Box>
                                      <AccordionIcon />
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    {ele?.friends.length === 0 ? (
                                      <Text>No friends!</Text>
                                    ) : (
                                      ele?.friends.map((e, index) => (
                                        <Box
                                          mx={9}
                                          my={2}
                                          key={index + Date.now()}
                                        >
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
                              <Heading size="md">
                                Recipes posted by user:{" "}
                              </Heading>
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
                                      <Text fontWeight={"bold"}>
                                        {e?.title}
                                      </Text>
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
                ) : (
                  <div>
                    <Grid
                      gridTemplateColumns={{
                        base: "repeat(1, 1fr)", // 1 column on small screens
                        md: "repeat(2, 1fr)", // 2 columns on medium screens
                        lg: "repeat(3, 1fr)", // 3 columns on large screens
                      }}
                      gap="30px"
                    >
                      {recipe?.length > 0 &&
                        recipe.map((ele, index) => (
                          <Card key={index}>
                            <Box
                              borderWidth="0"
                              borderRadius="md"
                              overflow="hidden"
                            >
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
                                <Carousel
                                  height={"300px"}
                                  images={ele?.images}
                                />
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
                                    onClick={() =>
                                      navigate(`/recipe/${ele._id}`)
                                    }
                                  >
                                    View Recipe
                                  </Button>
                                  <Button
                                    colorScheme="red"
                                    onClick={() => onOpen(ele._id)} // Pass the recipe ID to onOpen
                                  >
                                    Delete Recipe
                                  </Button>
                                </CardFooter>
                              </Box>
                            </Box>
                          </Card>
                        ))}
                    </Grid>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

const NavItem = (props) => {
  const { icon, children, onClick } = props;
  const color = useColorModeValue("gray.600", "gray.300");

  return (
    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        color: useColorModeValue("gray.900", "gray.200"),
      }}
      onClick={onClick} // Pass the onClick prop to the Flex component
    >
      {icon && (
        <Icon
          mx="2"
          boxSize="4"
          _groupHover={{
            color: color,
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

// const DIV = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
//   gap: 20px;
//   margin: 30px;
//   @media (max-width: 768px) {
//     grid-template-columns: repeat(
//       1,
//       1fr
//     ); /* 1 column on screens up to 768px wide */
//   }

//   @media (min-width: 769px) and (max-width: 1024px) {
//     grid-template-columns: repeat(
//       2,
//       1fr
//     ); /* 2 columns on screens between 769px and 1024px wide */
//   }

//   @media (min-width: 1025px) {
//     grid-template-columns: repeat(
//       3,
//       1fr
//     ); /* 3 columns on screens wider than 1024px */
//   }
// `;

// const ADMIN = styled.div`
//   @import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap");

//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   /* width: 100vw; */
//   padding: 0 10%;
//   font-family: "Raleway", sans-serif;
//   font-size: 20px;

//   .noShow {
//     display: none;
//   }

//   .tabs {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     width: 100%;
//     height: 100%;
//     padding: 10px 30px 30px 17%;
//     background: #fff;
//     /* overflow: hidden; */
//   }
//   .tabs .tab-header {
//     float: left;
//     width: 180px;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 50px;
//     border-right: 1px solid #ccc;
//     padding: 50px 0px;
//   }
// `;
