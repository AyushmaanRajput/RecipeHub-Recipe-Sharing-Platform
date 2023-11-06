import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Grid,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  EditableInput,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserDetails } from "../redux/authReducer/actions";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export const Account = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [showRecipe, setShowRecipe] = useState("recipes");
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  // console.log(token)
  const user = useSelector((store) => store.authReducer.loggedInUser);
  console.log("user" , user)
  // const recipes = useSelector((store) => store.authReducer.recipes);
  const [recipes, setRecipes] = useState([])
  const [likedRecipes, setLikedRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [userName, setUserName] = useState(user?.name);
  const [userBio, setUserBio] = useState(user?.bio);
  const [userCity, setUserCity] = useState(user?.city);

  // Function to edit profile
  const handleEditProfile = () => {
    const newUserName = userName || user?.name;
    const newUserBio = userBio || user?.bio;
    const newUserCity = userCity || user?.city;
    const relativePath = user?.profileImage.replace(
      /http:\/\/localhost:8080\//g,
      ""
    );

    const data = {
      name: newUserName,
      bio: newUserBio,
      city: newUserCity,
      profileImage: relativePath,
    };
    console.log("Data that i wanter to get updated", data);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    dispatch(updateUserDetails(user?._id, data, headers, toast));
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token, toast));
    }
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/recipe/getMyRecipe?populate=${showRecipe}&`,
        config
      )
      .then((response) => {
        setRecipes(response.data.recipes);
        setLikedRecipes(response.data.likedRecipes);
        setSavedRecipes(response.data.savedRecipes);
      })
      .catch((error) => {
        console.error("Error fetching user recipes:", error);
      });
  }, [showRecipe]);

  return (
    <Container bgColor={"#EEF2F7"} maxW="full" height={"100vh"} p={0}>
      {/* Modal for editting profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* For name */}
            <Center>
              <Text fontWeight={"bold"}>User Name:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.name}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserName) => setUserName(newUserName)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>

            {/* For city */}
            <Center>
              <Text fontWeight={"bold"}>User City:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.city}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserCity) => setUserCity(newUserCity)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>

            {/* For bio */}
            <Center>
              <Text fontWeight={"bold"}>User Bio:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.bio}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserBio) => setUserBio(newUserBio)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleEditProfile}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexDir={{ base: "column" }} bg="gray.100" p={4}>
        {/* User detail section */}
        <Box
          textAlign={"center"}
          w={"70%"}
          m={"auto"}
          display={"flex"}
          flexDirection={"row"}
        >
          {/* User Profile Info */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0}
          >
            <Image
              src={user?.profileImage}
              alt="Profile picture"
              borderRadius="full"
              // boxSize={"50%"}
              mx="auto"
              width={"50%"}
              height={"70%"}
            />
          </Box>
          <Box flexDir={{ base: "column" }} width>
            <Text fontWeight="bold" fontSize="lg" textAlign="center" mt={3}>
              {user?.name}
            </Text>
            <Text textAlign="center">{user?.city}</Text>
            <Button
              size="sm"
              colorScheme="teal"
              display="block"
              mx="auto"
              onClick={onOpen}
            >
              Edit Profile
            </Button>
            <Text textAlign="center" mt={4}>
              {user?.bio}
            </Text>
            <UnorderedList
              listStyleType="none"
              display="flex"
              justifyContent="space-between"
              p={4}
            >
              <ListItem>
                <Text fontWeight="bold">Posts</Text>
                <Text>{user?.recipes.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Friends</Text>
                <Text>{user?.friends.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Saved Recipes</Text>
                <Text>{user?.savedRecipes.length}</Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>

        {/* User Posts and others */}
        <Box w={"70%"} m={"auto"}>
          {/* Grid View of Images */}
          <Tabs isFitted>
            <TabList>
              <Tab onClick={() => setShowRecipe("recipes")}>Posts</Tab>
              <Tab onClick={() => setShowRecipe("savedRecipes")}>
                Saved Recipes
              </Tab>
              <Tab onClick={() => setShowRecipe("likedRecipes")}>
                Recent Likes
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {recipes?.length > 0 &&
                    recipes.map((ele, index) => (
                      <Tooltip
                        label={`Likes: ${ele?.likes?.length}, Comments: ${ele?.comments?.length}`}
                        key={index}
                      >
                        <div>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/${ele.images[0]}`}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                            onClick={() => navigate(`/recipe/${ele._id}`)}
                          />
                        </div>
                      </Tooltip>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {savedRecipes?.length > 0 &&
                    savedRecipes.map((ele, index) => (
                      <Tooltip
                        label={`Likes: ${ele?.likes?.length}, Comments: ${ele?.comments?.length}`}
                        key={index}
                      >
                        <div>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/${ele.images[0]}`}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                            onClick={() => navigate(`/recipe/${ele._id}`)}
                          />
                        </div>
                      </Tooltip>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {likedRecipes?.length > 0 &&
                    likedRecipes.map((ele, index) => (
                      <Tooltip
                        label={`Likes: ${ele?.likes?.length}, Comments: ${ele?.comments?.length}`}
                        key={index}
                      >
                        <div>
                          <Image
                            src={`${process.env.REACT_APP_API_URL}/${ele.images[0]}`}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                            onClick={() => navigate(`/recipe/${ele._id}`)}
                          />
                        </div>
                      </Tooltip>
                    ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
}
