import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { createUser } from "../../redux/authReducer/actions";
import { useDispatch } from "react-redux";

export const SignUpForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      setProfileImage(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("city", formData.city);
    formDataToSubmit.append("gender", formData.gender);
    formDataToSubmit.append("bio", formData.bio);
    formDataToSubmit.append("profileImage", profileImage);

    dispatch(createUser(formDataToSubmit, toast, navigate));
  };

  return (
    <Box>
      <Heading textTransform={"uppercase"} mb="2rem" size="2xl">
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
        <FormControl id="gender" isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            name="gender"
            onChange={handleChange}
            placeholder="Select Gender"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </FormControl>
        <FormControl id="bio">
          <FormLabel>Bio</FormLabel>
          <Textarea name="bio" onChange={handleChange} />
        </FormControl>
        <FormControl id="profileImage">
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
