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
import { Homecard } from "../components/home/HomeCard";
import InfoCard from "../components/home/Card";
import { RecipeCard } from "../components/home/RecipeCard";
import ImageGrid from "../components/home/ImageGrid";
import { Reveal } from "../components/common/Reveal";

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
      <Reveal>
        <Box className="cover">
          <img
            src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg"
            alt="Hero Background Image"
          />
          <div className="hero-content">
            <Heading
              as="h1"
              fontSize="3rem"
              fontWeight="800"
              textTransform="uppercase"
              textAlign="center"
              noOfLines={2}
              mb="1rem"
              textShadow="3px 3px 4px white"
            >
              Healthy Cooking Recipes <br />
              and the right Nutrition.
            </Heading>
            <Text textAlign="center" mb="2rem">
              Browse Through Over 6500 Tasty Recipes
            </Text>
            <Button>MORE RECIPES</Button>
            <Grid
              mt="3rem"
              width="100%"
              templateColumns="repeat(3, 1fr)"
              justifyContent="center"
              alignItems={"center"}
              gap={"3rem"}
            >
              {new Array(6).fill(1).map((el, i) => {
                return (
                  <Reveal delay={1 + (i + 1) * 0.25}>
                    <Homecard key={i} />
                  </Reveal>
                );
              })}
            </Grid>
          </div>
        </Box>
      </Reveal>
      <Box py={40}>
        <Reveal>
          <InfoCard direction={"row"} mb={"10rem"} />
        </Reveal>
        <Reveal>
          <InfoCard direction={"row-reverse"} />
        </Reveal>
      </Box>
      <Reveal>
        <Box textAlign="center" py={20}>
          <Heading
            fontFamily={"Kaushan Script, sans-serif"}
            size="lg"
            color="primary.500"
            mb="0.5rem"
          >
            More
          </Heading>
          <Heading
            fontWeight="800"
            lineHeight={1.15}
            mb="1rem"
            noOfLines={2}
            color="text"
            maxW="500px"
            mx="auto"
          >
            {" "}
            MOST POPULAR ITEM{" "}
          </Heading>
          <Text mb={"2rem"}>
            {" "}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />
            Odit id et est eveniet officiis.{" "}
          </Text>
          <Button mb={"4rem"}>Explore More</Button>
          <SimpleGrid columns={4} spacing={4} width="min(80rem,100%)" mx="auto">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </SimpleGrid>
        </Box>
      </Reveal>
      <Reveal>
        <Flex
          mx="auto"
          // border="1px solid black"
          direction={"row"}
          paddingBlock="5rem 10rem"
          width="min(80rem,100%)"
          alignItems="center"
          justifyContent={"space-between"}
          gap="2rem"
        >
          <ImageGrid />
          <Box width="50%" textAlign="right">
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
              ml="auto"
            >
              THAT'S WHAT OUR <br /> SAY CLIENT
            </Heading>
            <Text mb="2rem">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id
              et est eveniet officiis. Quos, ut natus quidem voluptas ducimus
              quis esse ullam dolor architecto reiciendis porro tempore suscipit
              animi.
            </Text>
            <Button>Explore More</Button>
          </Box>
        </Flex>
      </Reveal>
    </DIV>
  );
};

const DIV = styled.div`
  .cover {
    width: 100%;
    height: 90vh;
    text-align: center;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
      object-position: top;
    }
    .hero-content {
      position: absolute;
      width: min(80rem, 100%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 11;
    }
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background-color: #fff4;
      z-index: 1;
    }
  }
`;
