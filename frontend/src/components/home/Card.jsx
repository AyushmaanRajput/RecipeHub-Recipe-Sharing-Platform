import React from "react";
import { Box, Image, Text, Flex, Button, Heading } from "@chakra-ui/react";

const InfoCard = ({ img, direction, mb }) => {
  return (
    <Flex
      margin="auto"
      // border="1px solid black"
      direction={direction}
      width="min(80rem,100%)"
      alignItems="center"
      gap="30px"
      mb={mb ? mb : ""}
    >
      <Box width="75%" position="relative">
        <img
          src="/images/Pattern.png"
          alt="Pattern"
          style={{
            width: "50%",
            position: "absolute",
            right: direction == "row-reverse" ? "auto" : "66%",
            left: direction == "row-reverse" ? "66%" : "auto",
            top: "60%",
          }}
        />
        <Image
          src="https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg"
          alt="Sample Image"
          objectFit="cover"
          borderRadius={"2rem 0 2rem 0"}
          position="relative"
          zIndex={1}
          mr={4}
          boxShadow={"xl"}
        />
      </Box>
      <Box
        width="100%"
        textAlign={direction === "row-reverse" ? "left" : "right"}
      >
        <Heading
          fontFamily={"Kaushan Script, sans-serif"}
          size="lg"
          color="primary.500"
          mb="0.5rem"
        >
          About
        </Heading>
        <Heading
          fontWeight="800"
          lineHeight={1.15}
          mb="1rem"
          noOfLines={2}
          color="text"
          maxW="500px"
          ml={direction !== "row-reverse" ? "auto" : "none"}
        >
          HEALTHY AND QUALITY WITH A NEW FEEL
        </Heading>
        <Text maxW="750px" mb="2rem">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id et
          est eveniet officiis. Quos, ut natus quidem voluptas ducimus quis esse
          ullam dolor architecto reiciendis porro tempore suscipit animi.
        </Text>
        <Text color="gray.600"></Text>
        <Button>Explore More</Button>
      </Box>
    </Flex>
  );
};

export default InfoCard;
