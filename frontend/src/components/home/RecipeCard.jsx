import React from "react";
import { Box, Image, Text, Flex, Center } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon key={i} color={i <= rating ? "yellow.500" : "gray.300"} />
    );
  }

  return <Flex>{stars}</Flex>;
};

export const RecipeCard = ({ imageSrc, description, rating }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" _hover={{transform:"scale(1.05)"}}>
      <Image src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505" alt="Card Image" />
      <Box p="2">
        <Text fontSize="lg" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi in aut illum, eligendi iste dignissimos dolores veniam reiciendis natus rem, iure harum deleniti! Sit possimus sint repellat iste dolores ab.
        </Text>
        <Center my="2">
          <StarRating rating={3} />
        </Center>
      </Box>
    </Box>
  );
};


