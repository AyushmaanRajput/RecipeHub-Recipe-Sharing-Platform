import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";

import { getUserData, getUserRecipes } from "../redux/authReducer/actions";
import { Homecard } from "../components/Home/HomeCard";
import InfoCard from "../components/Home/Card";
import { RecipeCard } from "../components/Home/RecipeCard";
import ImageGrid from "../components/Home/ImageGrid";
import Footer from "../components/Footer";

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
    if (token) {
      dispatch(getUserRecipes(user?._id, token));
    }
  }, []);
  return (
    <DIV>
      <Box className="cover">
        <Heading
          textAlign="center"
          noOfLines={2}
          size="lg"
          fontSize="50px"
          mb="10px"
        >
          Healthy Cooking Recipes <br />
          and the right Nutrition.
        </Heading>
        <Text textAlign="center" mb="10px">
          Browse Through Over 6500 Tasty Recipes
        </Text>
        <Button margin="auto" className="btn" mb="10px">
          MORE RECIPES
        </Button>
        <Grid
          mt="50px"
          templateColumns="repeat(3, 25%)"
          justifyContent="center"
          alignItems={"center"}
          gap={9}
        >
          {new Array(6).fill(1).map((el, i) => {
            return <Homecard key={i} />;
          })}
        </Grid>
      </Box>
      <InfoCard direction={"row"} />
      <InfoCard direction={"row-reverse"} />
      <Box textAlign="center">
        <Heading size="md">More</Heading>
        <Heading fontWeight="bold"> MOST POPULAR ITEM </Heading>
        <Text mt={"10px"}>
          {" "}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
          Odit id et est eveniet officiis.{" "}
        </Text>
        <Text mt={"10px"} color="gray.600"></Text>
        <Button mt={"20px"} mb={"20px"}>
          Explore More
        </Button>
        <SimpleGrid columns={4} spacing={4} m="20px">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </SimpleGrid>
      </Box>

      <Flex
        margin="auto"
        // border="1px solid black"
        direction={"row"}
        mt="50px"
        p={4}
        width="80%"
        alignItems="center"
        gap="30px"
      >
        <ImageGrid/>
        <Box>
          <Heading size="md">About</Heading>
          <Heading fontWeight="bold" >
              THAT'S WHAT OUR <br /> SAY CLIENT 
          </Heading>
          <Text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id et
            est eveniet officiis. Quos, ut natus quidem voluptas ducimus quis
            esse ullam dolor architecto reiciendis porro tempore suscipit animi.
          </Text>
          <Text color="gray.600"></Text>
          <Button>Explore More</Button>
        </Box>
      </Flex>
      <Divider orientation="horizontal"  marginy="2rem" borderRadius="full"/>
      <Footer/>
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
