import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
import { Homecard } from "../components/home/HomeCard";
import InfoCard from "../components/home/Card";
import { useToast } from "@chakra-ui/react";
import { getUserData, getUserRecipes } from "../redux/authReducer/actions";

export const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const token = localStorage.getItem("token") || "";
  const user = useSelector((store) => store.authReducer.loggedInUser);

  useEffect(() => {
    if (!user && token) {
      dispatch(getUserData(token, toast));
    }
  }, []);
   useEffect(() => {
    if(token) {
      dispatch(getUserRecipes(user?._id, token));
    }
  }, [])
  return (
    <DIV>
      <Box textAlign="center" className="cover">
        <Heading noOfLines={2} size="lg" fontSize="50px" mb="10px">
          Healthy Cooking Recipes <br />
          and the right Nutrition.
        </Heading>
        <Text mb="10px">Browse Through Over 6500 Tasty Recipes</Text>
        <Button className="btn" mb="10px">
          MORE RECIPES
        </Button>
        <Grid mt="50px" templateColumns="repeat(3, 1fr)" gap={8}>
          <Homecard />
          <Homecard />
          <Homecard />
          <Homecard />
          <Homecard />
          <Homecard />
        </Grid>
      </Box>
      <InfoCard direction={"row"}/>
      <InfoCard direction={"row-reverse"}/>
    
    </DIV>
  );
};

const DIV = styled.div`
  .cover {
    width: 100%;
    background-image: url("https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg");
    background-size: cover;
    background-position: center;
    height: 700px;
    text-align: center;
    padding: 20px;
  }
`;
