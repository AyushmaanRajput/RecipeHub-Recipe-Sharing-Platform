import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
const recipes = [
  {
    name: "Spicy Mango Salsa",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9pbikyfivldmvf8rivfg.jpg",
  },
  {
    name: "Creamy Mushroom Risotto",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/32jo3oxq7sfneppw8hrw.jpg",
  },
  {
    name: "Citrus Glazed Salmon",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/69s4bbsn6v44cvllukdj.jpg",
  },
  {
    name: "Garlic Herb Roast",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tb83glu72e9guv4uy8n8.jpg",
  },
  {
    name: "Zesty Avocado Salad",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/acxhjjxsu75xk6fwqazn.jpg",
  },
  {
    name: "Blueberry Pancakes",
    image:
      "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qc6mrixtyl6ma9x9f47k.jpg",
  },
];
let imageUrls = [
  "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/okl0xaxft6552fjjtz2v.jpg",
  "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tont20fs91ztyywbv1w3.jpg",
  "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/58q9ssssox2malve6cey.jpg",
  "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jep6d8153aqns3lmxkzz.jpg",
];
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

  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    return window.innerWidth > 768
      ? "lg"
      : window.innerWidth > 480
      ? "md"
      : "base";
  }

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenSize());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRecipesToDisplay = () => {
    const recipesToShow = {
      lg: 6,
      md: 2,
      base: 1,
    };
    console.log(screenSize);
    return recipes.slice(0, recipesToShow[screenSize]);
  };

  return (
    <DIV>
      <Reveal>
        <Box className="cover">
          <img
            src="https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg"
            alt="Hero Background"
          />
          <div className="hero-content" style={{ paddingInline: "1rem" }}>
            <Heading
              as="h1"
              fontSize={{ lg: "3rem", md: "2rem", base: "1.5rem" }}
              fontWeight={{ lg: "800", md: "700", base: "600" }}
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
              width={{ xl: "100%", lg: "80%", md: "60%", base: "60%" }}
              templateColumns={{
                lg: "repeat(3, 1fr)",
                md: "repeat(2,1fr)",
                base: "1fr",
              }}
              mx={{ base: "auto" }}
              justifyContent="center"
              alignItems={"center"}
              gap={{ lg: "3rem", md: "2rem", base: "1rem" }}
            >
              {getRecipesToDisplay().map((el, i) => {
                return (
                  <Reveal key={i} delay={1 + (i + 1) * 0.25}>
                    <Homecard {...el} />
                  </Reveal>
                );
              })}
            </Grid>
          </div>
        </Box>
      </Reveal>
      <Box py={{ lg: 20, md: 16, base: 10 }}>
        <Reveal>
          <InfoCard
            img={
              "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/keyqnkmsp4cfr2d4qvtn.jpg"
            }
            title={"HEALTHY AND QUALITY WITH A NEW FEEL"}
            direction={"row"}
            screenSize={screenSize}
            mb={"15rem"}
          />
        </Reveal>
        <Reveal>
          <InfoCard
            img={
              "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yd6q7vj4fhvteleq0065.jpg"
            }
            screenSize={screenSize}
            title={"TASTE THE FUTURE OF GOOD FOOD"}
            direction={"row-reverse"}
          />
        </Reveal>
      </Box>
      <Reveal>
        <Box textAlign="center" py={{ lg: 20, md: 16, base: 10 }}>
          <Heading
            fontFamily={"Kaushan Script, sans-serif"}
            size={{ lg: "lg", md: "md", base: "sm" }}
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
            size={{ lg: "xl", md: "lg", base: "md" }}
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
          <SimpleGrid
            columns={{ lg: 4, md: 2, base: 1 }}
            spacing={4}
            width="min(80rem,100%)"
            mx="auto"
            px={{ lg: 4, base: 8 }}
          >
            {imageUrls.map((el, i) => {
              return <RecipeCard key={i} img={el} />;
            })}
          </SimpleGrid>
        </Box>
      </Reveal>
      <Reveal>
        <Flex
          mx="auto"
          // border="1px solid black"
          direction={{ lg: "row", md: "row", base: "column" }}
          paddingBlock={{ lg: "8rem 10rem", md: "5rem", base: "4rem" }}
          px={4}
          width="min(80rem,100%)"
          alignItems="center"
          justifyContent={"space-between"}
          gap="2rem"
        >
          <ImageGrid />
          <Box
            width={{ lg: "50%", base: "100%" }}
            textAlign={{ lg: "right", base: "center" }}
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
              noOfLines={{ lg: 2 }}
              color="text"
              maxW={{ lg: "500px" }}
              ml="auto"
              size={{ lg: "xl", md: "lg", base: "md" }}
            >
              THAT'S WHAT OUR <br /> SAY CLIENT
            </Heading>
            <Text mb="2rem">
              This dish combines fresh, high-quality ingredients to create a
              wholesome and nutritious meal that your body will thank you for.
              With a unique twist and a burst of exciting flavors, it's the
              perfect choice for a healthy and satisfying dining experience. Get
              ready to impress your family and friends with this remarkable
              recipe.
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
  @media screen and (max-width: 768px) {
    .cover {
      height: 70vh;
      img {
        width: 100%;
        min-height: 100%;
      }
    }
  }
`;
