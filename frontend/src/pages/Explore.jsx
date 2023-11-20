import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Divider,
  Tag,
  TagCloseButton,
  Text,
  VStack,
  useDisclosure,
  Flex,
  CardFooter,
  Card,
  CardHeader,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { getAllRecipes } from "../redux/authReducer/actions";
import { useSelector } from "react-redux";
import axios from "axios";
import FeedCard from "../components/Feed/FeedCard";
import { BiLike, BiShare } from "react-icons/bi";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Carousel } from "../components/Feed/SingleRecipeCarousel";

export const Explore = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [filter, setFilter] = useState(false);
  const [impression, setImpression] = useState(null);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const handleImpressionChange = (event) => {
    setImpression(event.target.value);
  };
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");

  const handleFilter = () => {
    setFilter(!filter);
    onClose();
  };

  // Function to set cuisine multiple option
  const handleCuisineChange = (e) => {
    const data = e.target.value;
    const newCuisines = [...selectedCuisines];
    if (newCuisines.includes(data)) {
      const index = newCuisines.indexOf(data);
      newCuisines.splice(index, 1);
    } else {
      newCuisines.push(data);
    }
    setSelectedCuisines(newCuisines);
  };

  // Function to remove cuisine
  const handleCuisineRemove = (cuisine) => {
    const updatedCuisines = selectedCuisines.filter((item) => item !== cuisine);
    setSelectedCuisines(updatedCuisines);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_URL}/recipe/getAllRecipe`, {
        params: {
          impression: impression,
          veg: selectedOption,
        },
        headers: config.headers,
      })
      .then((res) => {
        let filteredRecipes = res.data; // Initialize filteredRecipes with all recipes

        if (selectedCuisines.length > 0) {
          filteredRecipes = res.data.filter((recipe) => {
            // Check if at least one cuisine in the selectedCuisines array matches the cuisines of the recipe
            return selectedCuisines.some((selectedCuisine) =>
              recipe.cuisine.includes(selectedCuisine)
            );
          });
        }

        setRecipe(filteredRecipes); // Set the state with the filtered or unfiltered recipes
        setSelectedOption(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter]);

  console.log(recipe, "recipe");

  // All types of cuisine
  const cuisines = [
    "Mexican",
    "Italian",
    "Chinese",
    "Indian",
    "German",
    "Greek",
    "Filipino",
    "Japanese",
  ];

  return (
    <>
      <Box>
        {/* Hero section image with heading and a button */}
        <Box h="45vh" position="relative">
          <Image
            src="https://images.unsplash.com/photo-1495546968767-f0573cca821e?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero image"
            w="100%"
            h="100%"
            objectFit="cover"
          />

          <VStack
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            alignItems="center"
            justifyContent="space-around"
            paddingX="7"
          >
            <Heading
              as="h3"
              size="2xl"
              color="white"
              textShadow="1px 1px 2px black"
              textAlign={"center"}
            >
              Find the best recipes in a few step!
            </Heading>

            <Button>Search now</Button>
          </VStack>
        </Box>
        {/* Search bar and advance search option */}
        <Box boxShadow="0 4px 10px #0002" padding="4">
          <HStack spacing={5} width="min(80rem,100%)" mx="auto">
            {/* <Input variant="flushed" placeholder="Flushed" width='30%' /> */}
            <InputGroup width="30%">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="text" />
              </InputLeftElement>
              <Input
                placeholder="Search for a recipe"
                border="1px solid"
                outline="none"
                borderColor="text"
                _focus={{ borderColor: "primary.500" }}
              />
            </InputGroup>
            <Heading as="h5" size="md" color="text">
              Advanced Search
            </Heading>
            {/* This is the icon of filter */}
            <svg
              onClick={onOpen}
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              cursor="pointer"
            >
              <path
                fill="#F58332"
                d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17z"
              />
            </svg>
          </HStack>
          {/* This model will open when selected advance search feature */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* Options for rating */}
                <Select
                  value={impression}
                  onChange={handleImpressionChange}
                  placeholder="Recipes with Impressions"
                >
                  <option value="asc">Highest</option>
                  <option value="desc">Lowest</option>
                </Select>
                {/* Options for selecting veg / non-veg recipe */}
                <RadioGroup
                  marginY="5"
                  value={selectedOption}
                  onChange={setSelectedOption}
                >
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" value="veg">
                      Only Veg
                    </Radio>
                    <Radio colorScheme="red" value="non-veg">
                      Only Non-veg
                    </Radio>
                  </Stack>
                </RadioGroup>
                {/* Select option for single/multiple cuisines */}
                <Select
                  placeholder="Select cuisines"
                  value={cuisines}
                  onChange={handleCuisineChange}
                >
                  {cuisines.map((cuisine) => (
                    <option key={cuisine + Date.now()} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </Select>
                {/* This will show the selected cuisines */}
                <HStack
                  display={"flex"}
                  flexWrap={"wrap"}
                  paddingY="2"
                  spacing="2"
                >
                  {selectedCuisines.map((cuisine) => (
                    <Tag key={cuisine} size="md">
                      {cuisine}
                      <TagCloseButton
                        onClick={() => handleCuisineRemove(cuisine)}
                      />
                    </Tag>
                  ))}
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  border={"1px solid"}
                  borderColor={"secondary"}
                  color="secondary"
                  variant="outline"
                  mr="1rem"
                  onClick={onClose}
                >
                  Close
                </Button>
                <Button variant="solid" onClick={handleFilter}>
                  Apply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {/* Mapping all recipe */}
        <DIV>
          {recipe.length == 0 ? (
            <Spinner
              mx="auto"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="primary.500"
              size="xl"
            />
          ) : (
            recipe?.length > 0 &&
            recipe.map((ele, index) => (
              <Card
                textAlign={"left"}
                key={index}
                boxShadow={"lg"}
                borderRadius="1rem"
                transition="0.2s ease-in"
                _hover={{ boxShadow: "xl", transform: "scale(1.01)" }}
              >
                <Box borderWidth="0" borderRadius="md" overflow="hidden">
                  <CardHeader>
                    {/* <Image
                      width="100%"
                      src={`${process.env.REACT_APP_API_URL}/${ele.images[0]}`}
                      alt="Card"
                    /> */}
                    <Carousel height={"300px"} images={ele?.images} />
                  </CardHeader>
                  <Divider w="90%" mx="auto"></Divider>
                  <Box p="1rem">
                    <Heading
                      fontSize="lg"
                      m={0}
                      lineHeight={1.1}
                      textTransform="uppercase"
                      fontWeight="700"
                    >
                      {ele.title}
                    </Heading>
                    <Flex
                      align="center"
                      justifyContent="space-between"
                      py={1}
                      mb="0.5rem"
                    >
                      <Text
                        my={3}
                        fontFamily={"Kaushan Script"}
                        fontSize="md"
                        fontWeight="bold"
                        color="primary.500"
                      >
                        {ele?.cuisine[0]}
                      </Text>
                      <Flex mt={3} flexWrap="wrap" gap={3}>
                        {ele?.tags?.length > 0 &&
                          ele?.tags.map((e, index) => (
                            <Tag key={index}>{e}</Tag>
                          ))}
                      </Flex>
                    </Flex>
                    <Text fontSize="sm" mb="1rem">
                      {ele.description}
                    </Text>
                    <CardFooter
                      p="0"
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
                        border={"1px solid"}
                        borderColor={"secondary"}
                        color="secondary"
                        onClick={() => navigate(`/recipe/${ele._id}`)}
                      >
                        Details
                      </Button>
                    </CardFooter>
                  </Box>
                </Box>
              </Card>
            ))
          )}
        </DIV>
      </Box>
    </>
  );
};

const DIV = styled.div`
  text-align: center;
  min-height: 20vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: min(80rem, 100%);
  margin-inline: auto;
  padding-block: 5rem;
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
