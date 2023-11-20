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
  import { useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  
  export const SingleUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [user, setUser] = useState({})
  
    // Function to edit profile
console.log(user)

  
    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQyNjk4N2FlODJkZDg4M2VmZGNmMTAiLCJpYXQiOjE2OTkwMDU5NzF9.2BbpIwnPrvYyP2BY48EDBEVgdq8WaebKYtaXZ0KHgh0`,
        },
      };
  
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/getAllUsers/admin`, config)
        .then((res) => {
          let user = res.data.filter((id) => {
            return id._id === userId
          })
          console.log(user[0])
          setUser(user[0])
          setRecipes(user[0]?.recipes)
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    if(user.name == undefined) {
      return <h1>Loading...</h1>
    }
  
    return (
      <Container
        bgColor={"#EEF2F7"}
        maxW="full"
        height={"100vh"}
        p={0}
        paddingBlock={"3rem"}
      >
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
                src={`${process.env.REACT_APP_API_URL}/${user?.profileImage}`}
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
              </Flex>
  
              <Text p={0} m={0}>
                {user?.bio}
              </Text>
              <UnorderedList
                listStyleType="none"
                display="flex"
                justifyContent="space-around"
                m="0"
                textAlign={"center"}
              >
                <ListItem>
                  <Text fontWeight="bold" textTransform="uppercase">
                    Posts
                  </Text>
                  <Text>{user?.recipes.length}</Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
  
          {/* User Posts and others */}
          <Box w={"min(80rem,100%)"} m={"auto"} mt="1rem">
            {/* Grid View of Images */}
            <Tabs colorScheme="primary" isFitted>
              <TabList>
                <Tab>All Posts</Tab>
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
  