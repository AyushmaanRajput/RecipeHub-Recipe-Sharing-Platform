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
  Divider,
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
  // const recipes = useSelector((store) => store.authReducer.recipes);
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
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
    <Container
      bgColor={"#EEF2F7"}
      maxW="full"
      height={"100vh"}
      p={0}
      paddingBlock={"3rem"}
    >
      {/* Modal for editting profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textTransform={"uppercase"} fontSize={"2xl"}>
            Edit profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* For name */}
            <Center>
              <Text fontWeight={"bold"} textTransform={"uppercase"}>
                Name
              </Text>
            </Center>
            <Editable
              mb="1rem"
              textAlign="center"
              defaultValue={user?.name}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserName) => setUserName(newUserName)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} my="0.5rem" />
              <EditableControls />
            </Editable>
            <Divider mb="1rem"></Divider>

            {/* For city */}
            <Center>
              <Text fontWeight={"bold"} textTransform={"uppercase"}>
                City
              </Text>
            </Center>
            <Editable
              mb="1rem"
              textAlign="center"
              defaultValue={user?.city}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserCity) => setUserCity(newUserCity)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} my="0.5rem" />
              <EditableControls />
            </Editable>
            <Divider mb="1rem"></Divider>

            {/* For bio */}
            <Center>
              <Text fontWeight={"bold"} textTransform="uppercase">
                Biography
              </Text>
            </Center>
            <Editable
              mb="1rem"
              textAlign="center"
              defaultValue={user?.bio}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserBio) => setUserBio(newUserBio)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} my="0.5rem" />
              <EditableControls />
            </Editable>
            <Divider mb="1rem"></Divider>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={"1rem"} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleEditProfile}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexDir={{ base: "column" }} bg="gray.100" p={4}>
        {/* User detail section */}
        <Box
          w={"min(80rem,100%)"}
          mx={"auto"}
          display={"flex"}
          justifyContent={"space-between"}
          gap="1rem"
         
        >
          {/* User Profile Info */}
          <Box
            p={2}
            border="1px solid"
            borderColor={"accent"}
            borderRadius={"50%"}
            overflow="hidden"
            w={{md:'25%',base:"100%"}}
          >
            <Image
              aspectRatio={1}
              w={{base:"100%"}}
              maxH="20rem"
              borderRadius="50%"
              objectFit="cover"
              src={user?.profileImage}
              alt="Profile picture"
            />
          </Box>
          <Center>
            <Divider
              orientation="vertical"
              borderColor="secondary"
              opacity={0.3}
            />
          </Center>
          <Box
            display="flex"
            flexDir={{ base: "column" }}
            alignItems={"stretch"}
            justifyContent={"space-around"}
          >
            <Flex alignItems="center">
              <Text
                fontWeight="700"
                fontSize="lg"
                textTransform={"uppercase"}
                mr="1rem"
              >
                {user?.name}
              </Text>
              <Text>{user?.city}</Text>
              <Button
                size="sm"
                colorScheme="primary"
                variant={"outline"}
                onClick={onOpen}
                ml="auto"
              >
                Edit Profile
              </Button>
            </Flex>

            <Text p={0} m={0}>
              {user?.bio}
            </Text>
            <UnorderedList
              listStyleType="none"
              display="flex"
              justifyContent="space-between"
              m="0"
              textAlign={"center"}
            >
              <ListItem>
                <Text fontWeight="bold" textTransform="uppercase">
                  Posts
                </Text>
                <Text>{user?.recipes.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold" textTransform="uppercase">
                  Friends
                </Text>
                <Text>{user?.friends.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold" textTransform="uppercase">
                  Saved Recipes
                </Text>
                <Text>{user?.savedRecipes.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold" textTransform="uppercase">
                  Liked Recipes
                </Text>
                <Text>{user?.likedRecipes.length}</Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>

        {/* User Posts and others */}
        <Box w={"min(80rem,100%)"} m={"auto"} mt="1rem">
          {/* Grid View of Images */}
          <Tabs colorScheme="primary" isFitted>
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
                        bg="accent"
                        px={4}
                        py={2}
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
                        bg="accent"
                        px={4}
                        py={2}
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
                        bg="accent"
                        px={4}
                        py={2}
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
