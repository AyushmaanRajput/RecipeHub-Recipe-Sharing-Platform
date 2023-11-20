import React from "react";
import { Box, Image, Text, Flex, Button, Heading } from "@chakra-ui/react";

const InfoCard = ({ title, img, direction, mb, screenSize }) => {
  return (
    <Flex
      margin="auto"
      // border="1px solid black"
      direction={screenSize == "lg" ? direction : "column"}
      width="min(80rem,100%)"
      alignItems="center"
      gap={{ lg: "2rem", base: "4rem" }}
      px={4}
      mb={screenSize == "lg" ? mb : "4rem"}
    >
      <Box
        width={{ lg: "65%", base: "75%" }}
        position="relative"
        mb={screenSize == "lg" ? "2rem" : "0"}
      >
        <img
          src="/images/Pattern.png"
          alt="Pattern"
          style={{
            width: "40%",
            position: "absolute",
            right: direction == "row-reverse" ? "auto" : "76%",
            left: direction == "row-reverse" ? "76%" : "auto",
            top: "70%",
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
        textAlign={{
          lg: direction === "row-reverse" ? "left" : "right",
          md: "left",
          base: "center",
        }}
      >
        <Heading
          fontFamily={"Kaushan Script, sans-serif"}
          size={{ lg: "lg", md: "md", base: "sm" }}
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
          maxW={{ lg: "500px", md: "100%", base: "100%" }}
          mx={{ base: "auto", md: "none", lg: "none" }}
          size={{ lg: "lg", md: "md", base: "sm" }}
          ml={{ lg: direction !== "row-reverse" ? "auto" : "none" }}
        >
          {title}
        </Heading>
        <Text
          maxW={{ lg: "650px", md: "100%", base: "100%" }}
          ml={{ lg: direction !== "row-reverse" ? "auto" : "none" }}
          mb="2rem"
        >
          Indulge in a culinary adventure with our delightful recipe. Savor the
          perfect blend of flavors, textures, and aromas that make every bite an
          unforgettable experience. Whether you're a seasoned chef or a novice
          in the kitchen, this dish is easy to prepare and promises a delectable
          outcome.
        </Text>
        <Button>Explore More</Button>
      </Box>
    </Flex>
  );
};

export default InfoCard;
