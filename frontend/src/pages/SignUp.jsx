import React from "react";
import { SignUpForm } from "../components/forms/SignUpForm";
import { Box, Flex, Image } from "@chakra-ui/react";

export const SignUp = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      gap="1rem"
      overflow={"hidden"}
      marginBlock="8rem 10rem"
      mx="auto"
      w="min(80rem,100%)"
      borderRadius={"lg"}
      boxShadow={"2px 6px 20px 0 rgba(0,0,0,0.2)"}
    >
      <Box width="40%" p={"2rem"}>
        <SignUpForm />
      </Box>
      <Box width="60%" maxH={"85vh"} overflow={"hidden"}>
        <Image
          src={"/images/signupimage.jpg"}
          alt="Signup Image"
          objectFit="cover"
          w="100%"
        />
      </Box>
    </Flex>
  );
};
