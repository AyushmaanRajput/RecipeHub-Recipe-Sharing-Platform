import React, { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { Carousel } from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  Divider,
  Center,
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  useToast,
} from "@chakra-ui/react";
import { updateRecipe } from "../../redux/recipeReducer/actions";
import { updateUser } from "../../redux/userReducer/actions";

export default function FeedCard({ recipe }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loggedInUser, token } = useSelector((store) => store.authReducer);
  const [liked, setLiked] = useState(recipe.likes.includes(loggedInUser._id));
  const addLikeHandler = () => {
    // Check if the loggedInUser has not already liked the recipe
    if (!liked) {
      // Perform the like operation here, e.g., send a request to your API
      // Update the local state or Redux state accordingly
      let newLikes = [...recipe.likes, loggedInUser._id];
      let newLikedRecipes = [...loggedInUser.likedRecipes];
      if (!newLikedRecipes.includes(recipe._id)) {
        newLikedRecipes.push(recipe._id);
      }
      dispatch(updateRecipe(recipe._id, token, { likes: newLikes }, toast));
      dispatch(
        updateUser(
          loggedInUser._id,
          { likedRecipes: newLikedRecipes },
          token,
          toast,
          "like",
          recipe._id
        )
      );
    }
  };

  const removeLikeHandler = () => {
    // Check if the loggedInUser has already liked the recipe
    if (liked) {
      let newLikes = [...recipe.likes].filter(
        (like) => like != loggedInUser._id
      );
      let newLikedRecipes = [...loggedInUser.likedRecipes].filter(
        (recipeId) => recipeId != recipe._id
      );
      // Perform the unlike operation here, e.g., send a request to your API
      dispatch(updateRecipe(recipe._id, token, { likes: newLikes }, toast));
      // Update the local state or Redux state accordingly
      dispatch(
        updateUser(
          loggedInUser._id,
          { likedRecipes: newLikedRecipes },
          token,
          toast,
          "dislike",
          recipe._id
        )
      );
    }
  };
  // console.log(recipe.images);
  if (!recipe) {
    return <>Loading...</>; // Or display a loading message or handle this case as needed
  }
  return (
    <div>
      <Card w="100%" mb="10px" p="10px">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar size="lg" src={recipe.userId.profileImage} />
              <Center height="50px">
                <Divider orientation="vertical" />
              </Center>
              <Box>
                <Heading size="lg" mb={2}>
                  {recipe.userId.name}
                </Heading>
                <Text>{recipe.caption}</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="#fff4"
              icon={<BsBookmark size="sm" />}
            />
          </Flex>
        </CardHeader>
        <CardBody w="100%" mx="auto">
          <Divider width="100%" mx="auto" mb="10" />
          <Carousel images={recipe.images}></Carousel>

          <CardFooter
            px="0"
            justify="flex-start"
            gap="1rem"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button
              flex="0.25"
              bg={liked ? "#666" : "#fff"}
              color={liked ? "#fff" : "#666"}
              variant="outline"
              onClick={() => {
                setLiked((prev) => !prev);
                if (liked) {
                  removeLikeHandler();
                } else {
                  addLikeHandler();
                }
              }}
            >
              <BiLike color={liked ? "#fff" : "#666"} />
              <Text ml="4px">{recipe.likes.length}</Text>
            </Button>
            <Button flex="0.25" variant="outline" leftIcon={<BiShare />}>
              View Recipe
            </Button>
          </CardFooter>
          <Divider width="100%" mx="auto" mb="5" />
          <Heading as="h3" mb={"0.5rem"}>
            {recipe.title}
          </Heading>
          <Text mb="0.5rem">{recipe.description}</Text>
          <Text as="strong">{recipe.comments.length} comments</Text>
          <Input
            focusBorderColor="transparent"
            _focus={{ boxShadow: "none" }}
            border="none"
            type="text"
            placeholder="Add a comment..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
