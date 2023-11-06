import React from "react";
import { Box, Image, Text, Flex, Button, Heading } from "@chakra-ui/react";

const InfoCard = ({ title,img, direction, mb }) => {
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
          src={img}
          w={"100%"}
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
          {title}
        </Heading>
        <Text maxW="750px" mb="2rem">
        Indulge in a culinary adventure with our delightful recipe. 
        Savor the perfect blend of flavors, textures, and aromas 
        that make every bite an unforgettable experience. 
        Whether you're a seasoned chef or a novice in the kitchen, 
        this dish is easy to prepare and promises a delectable outcome.
        </Text>
        <Text color="gray.600"></Text>
        <Button>Explore More</Button>
      </Box>
    </Flex>
  );
};

export default InfoCard;
