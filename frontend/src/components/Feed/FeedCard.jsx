import React, { useState } from "react";
import { BsBookmark } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

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
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Input,
} from "@chakra-ui/react";
export default function FeedCard() {
  return (
    <div>
      <Card w="100%" mb="10px" p="10px">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar size="lg" src={<AiOutlineUser />} />

              <Box>
                <Heading size="lg">Name of who is posted</Heading>
                <Text>Category, time</Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsBookmark size="sm" />}
            />
          </Flex>
        </CardHeader>
        <CardBody w="80%" margin="auto">
          <Heading size={"md"} mb={"10px"}>
            Name of recipe
          </Heading>
          <Image
            w="100%"
            borderRadius="10px"
            objectFit="cover"
            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
            alt="Chakra UI"
          />
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            Like
          </Button>
          {/* <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            Comment
          </Button> */}
          <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
            Share
          </Button>
        </CardFooter>
        <Text p="10px">
          comments...

        </Text>
       <Input 
       focusBorderColor="transparent"  // Sets the focus border color to transparent
       _focus={{ boxShadow: "none" }}
       border="none"
       type="text" placeholder="Add a comment..." />
      </Card>
    </div>
  );
}
