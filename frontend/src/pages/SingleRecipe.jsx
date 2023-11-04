import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Carousel } from "../components/Feed/SingleRecipeCarousel";
import { useParams } from 'react-router-dom'
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getUserDetailsForSingleRecipe } from "../redux/authReducer/actions";
import { getSingleRecipe } from "../redux/recipeReducer/actions";
import axios from "axios";


function SingleRecipe() {
  const { postId } = useParams()
  const [owner, setOwner] = useState({});
  const [recipe, setRecipe] = useState({});

  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");

  useEffect(() => {
    // async function fetchData() {
    //   const singleRecipe = await getSingleRecipe(token, postId)
    //   setRecipe(singleRecipe);
    //   setOwner(singleRecipe.userId)
    // }

    // fetchData();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get(`${process.env.REACT_APP_API_URL}/recipe/getSingleRecipe/${postId}`, config).then((res) => {
      // console.log(res.data)
      setRecipe(res?.data);
      setOwner(res.data.userId)
      return res.data
    }).catch((err) => {
      console.log(err)
    })
  }, []);

  console.log("Recipe", recipe);
  console.log("Owner", owner);

  if(!recipe.title) {
    return <h1>Loading..</h1>
  }

  return (
    <>
      <DIV>
        <Box width={"50%"}>
          <Carousel images={recipe?.images} />
        </Box>
        <Box width={"45%"} p={2}>
          {/* User details image, name, city */}
          <Flex gap={3}>
            <img
              style={{ borderRadius: "50%" }}
              width={"15%"}
              src={`${process.env.REACT_APP_API_URL}/${owner.profileImage}`}
              alt="Owner"
            />
            <Box>
              <Text fontWeight={"bold"}>{owner?.name}</Text>
              <Flex alignItems={"center"}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Z"
                  />
                </svg>
                <h5>{owner?.city}</h5>
              </Flex>
            </Box>
          </Flex>

          {/* Recipe Information */}
          <Flex flexDir={"column"} mt={5} gap={3}>
            <Flex gap={3} alignItems={"center"}>
              <Heading as={"h3"}>{recipe?.title}</Heading>
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill={recipe?.veg ? "#10b981" : "#ea580c"}
                  d="M20 4v16H4V4h16m2-2H2v20h20V2M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6Z"
                />
              </svg>
            </Flex>
            <Flex alighItems="center" gap={3}>
              <svg
                width="33"
                height="33"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="m20 15l2-2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13l-2 2H4v12h16v-3zm2.44-8.56l-.88-.88a1.5 1.5 0 0 0-2.12 0L12 13v2H6v2h9v-1l7.44-7.44a1.5 1.5 0 0 0 0-2.12z"
                />
              </svg>
              <Text>{recipe?.description}</Text>
            </Flex>
            <Flex alighItems="center" gap={3}>
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M21 15c0-4.625-3.507-8.441-8-8.941V4h-2v2.059c-4.493.5-8 4.316-8 8.941v2h18v-2zM2 18h20v2H2z"
                />
              </svg>{" "}
              <Text>{recipe.cuisine[0]}</Text>
            </Flex>
          </Flex>
          <Flex gap={4} my={3}>
            {recipe?.tags?.length > 0 &&
              recipe?.tags?.map((ele, index) => <Tag key={index}>{ele}</Tag>)}
          </Flex>
        </Box>
      </DIV>
      {/* Recipe Ingredients */}
      <Box width={"90%"} m={"auto"} display={"flex"} >
        <Box width={"40%"}>
          <Heading as={"h3"} m={3}>
            Ingredients
          </Heading>
          <VStack textAlign="left" align="start">
            {recipe?.ingredients.length > 0 &&
              recipe.ingredients.map((ele, ind) => (
                <Flex>
                  <Checkbox colorScheme="green" defaultChecked>
                    <Text>{ele}</Text>
                  </Checkbox>
                </Flex>
              ))}
          </VStack>
        </Box>
        <Box width={"60%"}>
          <Heading as={"h3"} m={3}>
            Instructions
          </Heading>
          <Stepper orientation='vertical' height='450px' gap='0'>
      {recipe?.instructions.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box>
            <StepTitle>{step}</StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
        </Box>
      </Box>
    </>
  );
}

export default SingleRecipe;

const DIV = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
  margin: 50px auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
