import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Divider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import FeedCard from "./FeedCard";
import { useDispatch, useSelector } from "react-redux";
import { getFeed } from "../../redux/recipeReducer/actions";

export const UserFeed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.recipeReducer.feed);
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  const isLoading = useSelector((store) => store.recipeReducer.isLoading);

  useEffect(() => {
    if (token) {
      dispatch(getFeed(token));
    }
  }, []);

  return (
    <Box p={5} w="50%" h="90vh" overflowY="scroll" className="scroll">
      {isLoading ? (
        // Display loading state if the data is still being fetched
        <Flex alignItems="center" justifyContent={"center"} minH={"50vh"}>
          <Spinner
            w="6rem"
            h="6rem"
            mx="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="2xl"
          />
        </Flex>
      ) : feed.length > 0 ? (
        feed.map((recipe, index) => {
          return <FeedCard key={index} recipe={recipe} />;
        })
      ) : (
        <Heading as="h2">Nothing In Feed</Heading>
      )}
    </Box>
  );
};
