import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AddRecipeForm } from "../components/forms/AddRecipeForm";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export const AddRecipeModal = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isAuth) {
    return null;
  }

  return (
    <>
      <Box
        position="fixed"
        bottom="2rem"
        right="2rem"
        zIndex="999" // Ensure it's above other elements
      >
        <Button
          onClick={openModal}
          size="md"
          bg="teal.500"
          color="white"
          borderRadius="50%"
          width={4}
          p={6}
          boxShadow="md"
        >
          <AddIcon />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddRecipeForm />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" m={0} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
