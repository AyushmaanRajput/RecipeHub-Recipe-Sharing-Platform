import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    gender: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      console.log("Selected image file:", e.target.files[0]);
      setProfileImage(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the form data
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    if (profileImage) {
      form.append("profileImage", profileImage);
    }
    console.log(form, formData, profileImage);
    try {
      // Send the registration data to the server
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        form ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the server response here
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" onChange={handleChange} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" onChange={handleChange} />
        </FormControl>
        <FormControl id="city">
          <FormLabel>City</FormLabel>
          <Input type="text" name="city" onChange={handleChange} />
        </FormControl>
        <FormControl id="gender">
          <FormLabel>Gender</FormLabel>
          <Input type="text" name="gender" onChange={handleChange} />
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" onChange={handleChange} />
        </FormControl>
        <FormControl id="profileImage" isRequired>
          <FormLabel>Profile Image</FormLabel>
          <Input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
