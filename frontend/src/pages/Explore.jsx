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
  Tag,
  TagCloseButton,
  Text,
  VStack,
  useDisclosure,
  Flex,
  CardFooter,
  Card,
  CardHeader,
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
  const [save, setSave] = useState(false);
  const [rating, setRating] = useState("");
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");

  const handleFilter = () => {
    const data = {
      cuisine: selectedCuisines,
      rating: rating,
      veg: selectedOption,
    };
    console.log(data);
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
    console.log("Updated cuisines: " + updatedCuisines);
    setSelectedCuisines(updatedCuisines);
  };

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
    "Other",
  ];

  return (
    <>
      <Box>
        {/* Hero section image with heading and a button */}
        <Box h="35vh" position="relative">
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
              noOfLines={1}
            >
              Find the best recipes in a few step!
            </Heading>

            <Button>Search now</Button>
          </VStack>
        </Box>
        {/* Search bar and advance search option */}
        <Box
          boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
          padding="4"
        >
          <HStack marginX={5} spacing={5}>
            {/* <Input variant="flushed" placeholder="Flushed" width='30%' /> */}
            <InputGroup width="30%">
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Search for a recipe" />
            </InputGroup>
            <Heading as="h5" size="md" color="#F58332" noOfLines={1}>
              Advanced Search
            </Heading>
            {/* This is the icon of filter */}
            <svg
              onClick={onOpen}
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
                  value={rating}
                  onChange={handleRatingChange}
                  placeholder="Rating"
                >
                  <option value="asc">Ascending order</option>
                  <option value="desc">Descending order</option>
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
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleFilter}>
                  Apply
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {/* Mapping all recipe */}
        <DIV>
          {recipe?.length > 0 &&
            recipe.map((ele, index) => (
              <Card key={index}>
                <Box borderWidth="0" borderRadius="md" overflow="hidden">
                  <CardHeader>
                    {/* <Image
                      width="100%"
                      src={`${process.env.REACT_APP_API_URL}/${ele.images[0]}`}
                      alt="Card"
                    /> */}
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
                        ele?.tags.map((e, index) => <Tag key={index}>{e}</Tag>)}
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
                        bg={"#fff"}
                        color={"#666"}
                        variant="outline"
                      >
                        <BiLike color={"#666"} />
                        <Text ml="4px">{ele?.likes?.length}</Text>
                      </Button>
                      <Button
                        flex={{ base: "1", md: "0.25" }}
                        variant="outline"
                        leftIcon={<BiShare />}
                        onClick={() => navigate(`/recipe/${ele._id}`)}
                      >
                        View Recipe
                      </Button>
                    </CardFooter>
                  </Box>
                </Box>
              </Card>
            ))}
        </DIV>
      </Box>
    </>
  );
};

const DIV = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 30px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); /* 1 column on screens up to 768px wide */
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on screens between 769px and 1024px wide */
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on screens wider than 1024px */
  }
`;
