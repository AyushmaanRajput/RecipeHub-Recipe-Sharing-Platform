import React from "react";
import { LoginForm } from "../components/forms/LoginForm";
import { Box, Flex, Image } from "@chakra-ui/react";

export const Login = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      overflow={"hidden"}
      marginBlock="8rem 10rem"
      mx="auto"
      w="min(70rem,100%)"
      borderRadius={"lg"}
      boxShadow={"2px 6px 20px 0 rgba(0,0,0,0.2)"}
    >
      <Box width="50%" overflow={"hidden"}>
        <Image
          src={"/images/loginImage.jpg"}
          alt="Login Image"
          objectFit="cover"
          maxH="30rem"
          w="100%"
        />
      </Box>
      <Box width="50%" p={"2rem"}>
        <LoginForm />
      </Box>
    </Flex>
  );
};
