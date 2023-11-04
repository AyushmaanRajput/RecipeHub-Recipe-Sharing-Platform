import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
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
  WrapItem,
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
  useToast,
} from "@chakra-ui/react";
import { updateRecipe } from "../../redux/recipeReducer/actions";
import { updateUser } from "../../redux/userReducer/actions";
import axios from "axios";
import { getFeed } from "../../redux/recipeReducer/actions";

export default function FeedCard({ recipe }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loggedInUser, token } = useSelector((store) => store.authReducer);
  const [liked, setLiked] = useState(recipe.likes.includes(loggedInUser._id));
  const [saved, setSaved] = useState(
    loggedInUser.savedRecipes.includes(recipe._id)
  );

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
      console.log(newLikes, 1, newLikedRecipes, 2);

      dispatch(updateRecipe(recipe._id, { likes: newLikes }, token, toast));
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

      console.log(newLikes, 1, newLikedRecipes, 2);
      // Perform the unlike operation here, e.g., send a request to your API
      dispatch(updateRecipe(recipe._id, { likes: newLikes }, token, toast));
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

  const saveRecipeHandler = () => {
    // Check if the recipe is not already saved
    if (!saved) {
      let newSavedRecipes = [...loggedInUser.savedRecipes, recipe._id];

      // Perform the save operation here, e.g., send a request to your API
      // Update the local state or Redux state accordingly
      dispatch(
        updateUser(
          loggedInUser._id,
          { savedRecipes: newSavedRecipes },
          token,
          toast,
          "save",
          recipe._id
        )
      );

      setSaved(true);
    }
  };

  const unsaveRecipeHandler = () => {
    // Check if the recipe is already saved
    if (saved) {
      let newSavedRecipes = loggedInUser.savedRecipes.filter(
        (savedRecipeId) => savedRecipeId !== recipe._id
      );

      // Perform the unsave operation here, e.g., send a request to your API
      // Update the local state or Redux state accordingly
      dispatch(
        updateUser(
          loggedInUser._id,
          { savedRecipes: newSavedRecipes },
          token,
          toast,
          "unsave",
          recipe._id
        )
      );

      setSaved(false);
    }
  };

  const [comments, setComments] = useState(recipe.comments);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  const addCommentHandler = async () => {
    if (newComment.trim() === "") {
      return;
    }

    try {
      // Send a request to add a new comment
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/comment/add`,
        {
          text: newComment,
          userId: loggedInUser._id,
          recipeId: recipe._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Comment Added Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setComments([...comments, response.data.comment]);
      setNewComment("");
      dispatch(getFeed(token));
    } catch (error) {
      // Handle errors and display a toast message
      toast({
        title: "Couldn't add comment",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const updateCommentHandler = async () => {
    if (newComment.trim() === "") return;

    try {
      // Send a request to update the comment
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/comment/update/${editingComment}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state to reflect the updated comment
      const updatedComments = comments.map((comment) => {
        if (comment._id === editingComment) {
          return response.data.comment;
        }
        return comment;
      });
      toast({
        title: "Comment Updated Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setComments(updatedComments);
      setEditingComment(null);
      setNewComment("");
      dispatch(getFeed(token));
    } catch (error) {
      // Handle errors and display a toast message
      toast({
        title: "Couldn't update comment",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      // Send a request to delete the comment
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/comment/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Comment Deleted Successfully",
        status: "sucess",
        duration: 1000,
        isClosable: true,
      });
      // Update the local state to remove the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      dispatch(getFeed(token));
    } catch (error) {
      // Handle errors and display a toast message
      toast({
        title: "Couldn't delete comment",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

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
              icon={
                saved ? <BsBookmarkFill size="xs" /> : <BsBookmark size="xs" />
              } // Use filled or unfilled bookmark icon based on saved state
              onClick={() => {
                if (saved) {
                  unsaveRecipeHandler();
                } else {
                  saveRecipeHandler();
                }
              }}
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
          <Text as="strong">
            {comments.length} {comments.length === 1 ? "comment" : "comments"}
          </Text>

          {/* Render existing comments */}
          {comments.map((comment) => {
            console.log(comment);
            return (
              <div key={comment._id}>
                <Flex gap="3rem" alignItems={"center"} my={4}>
                  <WrapItem display="flex" alignItems={"center"} width="100%">
                    <div
                      style={{
                        width: "30%",
                        display: "flex",
                        gap: "1rem",
                        paddingInline: "0.5rem",
                        marginRight: "1rem",
                        borderRight: "1px solid #3337",
                      }}
                    >
                      <Avatar
                        size="sm"
                        name="Kent Dodds"
                        src={`${process.env.REACT_APP_API_URL}/${comment.userId.profileImage}`}
                      />
                      <Text
                        as="p"
                        justifySelf="flex-start"
                        ml="8px"
                        fontWeight={"500"}
                      >
                        {comment.userId.name}
                      </Text>
                    </div>
                    <Text letterSpacing={"1px"}>{comment.text}</Text>
                  </WrapItem>
                </Flex>

                {comment.userId === loggedInUser._id && (
                  <div>
                    <Button onClick={() => setEditingComment(comment._id)}>
                      Edit
                    </Button>
                    <Button onClick={() => deleteCommentHandler(comment._id)}>
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add a new comment */}
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            focusBorderColor="transparent"
            _focus={{ boxShadow: "none" }}
            border="none"
            type="text"
            placeholder="Add a comment..."
          />
          <Button
            onClick={editingComment ? updateCommentHandler : addCommentHandler}
          >
            {editingComment ? "Update Comment" : "Add Comment"}
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
