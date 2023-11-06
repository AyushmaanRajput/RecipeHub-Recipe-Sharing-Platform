import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authReducer/actions";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Stack,
  Heading,
} from "@chakra-ui/react";

export const LoginForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    if(email === "admin@gmail.com" && password === "admin")  {
      navigate("/admin");
      return
    }
    e.preventDefault();
    // Handle form submission logic here
    if (email && password) {
      let userObj = { email, password };
      dispatch(loginUser(userObj, toast, navigate));
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      width="min(30rem,100%)"
      mx="auto"
      marginBlock="20vh 30vh"
    >
      <Box width={"100%"}>
        {/* <Image width={"100%"} src="https://img.freepik.com/free-photo/woman-taking-food-photos-close-up_23-2149294503.jpg?w=740&t=st=1699212698~exp=1699213298~hmac=d5efe9e27510a829fb47235fd3c4d8deac014a14408472c77d1e83bbea1f06ea" alt="Loading..." /> */}
      </Box>
      <Box width={"100%"}>
        <Heading as="h2" size="lg" mb={4}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button size="sm" mr="4" onClick={handlePasswordVisibility}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              mx="auto"
              colorScheme="blue"
              width="min-content"
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};
