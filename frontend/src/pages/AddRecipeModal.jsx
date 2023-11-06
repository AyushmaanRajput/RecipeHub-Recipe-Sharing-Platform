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
      <Box position="fixed" bottom="2rem" right="2rem" zIndex="999">
        <Button
          onClick={openModal}
          size="md"
          bgColor="accent"
          color="background"
          borderRadius="50%"
          width={4}
          p={6}
          boxShadow="xl"
        >
          <AddIcon />
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent width="min(50rem,100%)">
          <ModalHeader textTransform={"uppercase"} fontSize={"2xl"}>
            Add Recipe
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddRecipeForm closeModal={closeModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
