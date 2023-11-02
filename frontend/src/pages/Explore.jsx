import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

const dummyRecipeData = [
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
];

export const Explore = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [recipe, setRecipe] = useState(dummyRecipeData);
  const [save, setSave] = useState(false);

  const handleSave = () => {
    setSave(!save);
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

  console.log(selectedCuisines);

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
    "Other"
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
                <Select placeholder="Rating">
                  <option value="asc">Ascending order</option>
                  <option value="desc">Descending order</option>
                </Select>
                {/* Options for selecting veg / non-veg recipe */}
                <RadioGroup marginY="5">
                  <Stack spacing={5} direction="row">
                    <Radio colorScheme="green" value="1">
                      Only Veg
                    </Radio>
                    <Radio colorScheme="red" value="2">
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
                <HStack display={"flex"} flexWrap={"wrap"} paddingY="2" spacing="2">
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
                <Button variant="ghost">Apply</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        {/* Mapping all recipe */}
        <VStack margin={20} spacing={5}>
          {recipe.length > 0 &&
            recipe.map((ele) => (
              <Box
                boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                padding="2"
                border="1px solid #ccc"
                marginX={5}
                position="relative"
              >
                <Image
                  src={ele.image[0]}
                  alt={ele.title}
                  boxSize="25%"
                  objectFit="cover"
                />

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  width="75%"
                  height="100%"
                  paddingX="5"
                >
                  {/* Title */}
                  <Heading as="h3" size="lg">
                    {ele.title}
                  </Heading>

                  {/* Preparation time and rating */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    height={"100%"}
                    marginY="2"
                  >
                    <Text fontSize="sm" color="gray.500">
                      Preparation Time: {ele.time}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Rating: {ele.rating}
                    </Text>
                  </Box>

                  {/* Save button */}
                  <Box
                    position="absolute"
                    top="5"
                    right="5"
                    paddingX="2"
                    paddingY="1"
                    borderRadius="sm"
                    onClick={handleSave}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#eab308"
                        d={
                          !save
                            ? "M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Zm2-3.05l5-2.15l5 2.15V5H7v12.95ZM7 5h10H7Z"
                            : "M5 21V5q0-.825.588-1.413T7 3h10q.825 0 1.413.588T19 5v16l-7-3l-7 3Z"
                        }
                      />
                    </svg>
                  </Box>

                  {/* Description */}
                  <Text fontSize="md">{ele.description}</Text>

                  {/* Number of comments */}
                  <Text fontSize="sm" color="gray.500" marginTop="2">
                    {ele.comments.length}
                  </Text>
                </Box>
              </Box>
            ))}
        </VStack>
      </Box>
    </>
  );
};

