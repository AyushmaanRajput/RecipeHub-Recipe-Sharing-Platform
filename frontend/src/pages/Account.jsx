import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Text,
  UnorderedList,
  ListItem,
  Grid,
  HStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  EditableInput,
  Textarea,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserDetails } from "../redux/authReducer/actions";
import { useToast } from "@chakra-ui/react";

const dummyRecipeData = [
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
  {
    userId: "user1",
    title: "Spaghetti Carbonara",
    image: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino cheese",
      "Salt and black pepper",
    ],
    instructions: [
      "Boil spaghetti until al dente",
      "Cook pancetta until crispy",
      "Mix eggs and cheese",
      "Toss all together",
      "Season with salt and pepper",
    ],
    caption: "Delicious and creamy pasta!",
    veg: false,
    time: "30 minutes",
    tags: ["Italian", "Pasta", "Eggs"],
    cuisine: "Italian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user2", text: "This is my favorite pasta recipe!" },
      { userId: "user3", text: "So yummy, thanks for sharing!" },
    ],
    rating: 4.5,
    macros: { calories: 450, carbs: 30, fats: 20, proteins: 25 },
  },
  {
    userId: "user2",
    title: "Chicken Stir-Fry",
    image: [
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "Quick and easy stir-fry with chicken and vegetables.",
    ingredients: [
      "300g chicken breast",
      "Assorted vegetables",
      "Soy sauce",
      "Ginger",
      "Garlic",
    ],
    instructions: [
      "Marinate chicken in soy sauce, ginger, and garlic",
      "Stir-fry chicken and vegetables",
      "Serve hot",
    ],
    caption: "Healthy and delicious!",
    veg: false,
    time: "20 minutes",
    tags: ["Chinese", "Stir-Fry", "Chicken"],
    cuisine: "Chinese",
    likes: ["user1", "user2"],
    comments: [
      { userId: "user1", text: "I make this all the time!" },
      { userId: "user2", text: "Great weeknight dinner option." },
    ],
    rating: 4.2,
    macros: { calories: 320, carbs: 15, fats: 10, proteins: 35 },
  },
  {
    userId: "user3",
    title: "Margarita Pizza",
    image: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Classic Italian pizza with tomato, basil, and mozzarella cheese.",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh basil leaves",
      "Mozzarella cheese",
      "Olive oil",
    ],
    instructions: [
      "Roll out pizza dough",
      "Spread tomato sauce and add toppings",
      "Bake in a hot oven",
      "Drizzle with olive oil",
      "Top with fresh basil leaves",
    ],
    caption: "Simple and delicious!",
    veg: true,
    time: "25 minutes",
    tags: ["Italian", "Pizza", "Mozzarella"],
    cuisine: "Italian",
    likes: ["user2", "user3", "user4"],
    comments: [
      { userId: "user2", text: "I love Margarita pizza!" },
      { userId: "user4", text: "The fresh basil is a game-changer." },
    ],
    rating: 4.6,
    macros: { calories: 300, carbs: 40, fats: 12, proteins: 15 },
  },
  {
    userId: "user4",
    title: "Vegetable Curry",
    image: [
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description: "A flavorful and spicy curry with mixed vegetables.",
    ingredients: [
      "Assorted vegetables",
      "Curry paste",
      "Coconut milk",
      "Spices",
      "Rice",
    ],
    instructions: [
      "Chop and cook vegetables",
      "Simmer in curry paste and coconut milk",
      "Season with spices",
      "Serve over rice",
    ],
    caption: "Perfect for a cozy dinner!",
    veg: true,
    time: "45 minutes",
    tags: ["Indian", "Curry", "Vegetarian"],
    cuisine: "Indian",
    likes: ["user2", "user3"],
    comments: [
      { userId: "user3", text: "This is a family favorite." },
      { userId: "user5", text: "I like it spicy!" },
    ],
    rating: 4.4,
    macros: { calories: 380, carbs: 35, fats: 18, proteins: 10 },
  },
  {
    userId: "user5",
    title: "Greek Salad",
    image: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    description:
      "Refreshing salad with tomatoes, cucumbers, feta cheese, and olives.",
    ingredients: [
      "Tomatoes",
      "Cucumbers",
      "Feta cheese",
      "Kalamata olives",
      "Red onion",
    ],
    instructions: [
      "Chop vegetables",
      "Crumble feta cheese",
      "Toss all ingredients",
      "Dress with olive oil and lemon juice",
    ],
    caption: "Healthy and tasty!",
    veg: true,
    time: "15 minutes",
    tags: ["Greek", "Salad", "Vegetarian"],
    cuisine: "Greek",
    likes: ["user2", "user4"],
    comments: [
      { userId: "user4", text: "I could eat this every day." },
      { userId: "user6", text: "So fresh and delicious!" },
    ],
    rating: 4.7,
    macros: { calories: 220, carbs: 15, fats: 16, proteins: 8 },
  },
];

export const Account = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token =
    useSelector((store) => store.authReducer.token) ||
    localStorage.getItem("token");
  // console.log(token)
  const user = useSelector((store) => store.authReducer.loggedInUser);
  const recipes = useSelector((store) => store.authReducer.recipes);
  console.log(recipes);
  const [data, setData] = useState(dummyRecipeData);
  const [userName, setUserName] = useState(user?.name);
  const [userBio, setUserBio] = useState(user?.bio);
  const [userCity, setUserCity] = useState(user?.city);

  // Function to edit profile
  const handleEditProfile = () => {
    const newUserName = userName || user?.name;
    const newUserBio = userBio || user?.bio;
    const newUserCity = userCity || user?.city;
    const relativePath = user?.profileImage.replace(
      /http:\/\/localhost:8080\//g,
      ""
    );

    const data = {
      name: newUserName,
      bio: newUserBio,
      city: newUserCity,
      profileImage: relativePath,
    };
    console.log("Data that i wanter to get updated", data);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    dispatch(updateUserDetails(user?._id, data, headers, toast));
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserData(token, toast));
    }
  }, []);

  return (
    <Container bgColor={"#EEF2F7"} maxW="full" height={"100vh"} p={0}>
      {/* Modal for editting profile */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* For name */}
            <Center>
              <Text fontWeight={"bold"}>User Name:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.name}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserName) => setUserName(newUserName)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>

            {/* For city */}
            <Center>
              <Text fontWeight={"bold"}>User City:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.city}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserCity) => setUserCity(newUserCity)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>

            {/* For bio */}
            <Center>
              <Text fontWeight={"bold"}>User Bio:</Text>
            </Center>
            <Editable
              textAlign="center"
              defaultValue={user?.bio}
              fontSize="md"
              isPreviewFocusable={false}
              onChange={(newUserBio) => setUserBio(newUserBio)}
            >
              <EditablePreview />
              {/* Here is the custom input */}
              <Textarea as={EditableInput} />
              <EditableControls />
            </Editable>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleEditProfile}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexDir={{ base: "column" }} bg="gray.100" p={4}>
        {/* User detail section */}
        <Box
          textAlign={"center"}
          w={"70%"}
          m={"auto"}
          display={"flex"}
          flexDirection={"row"}
        >
          {/* User Profile Info */}
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            p={0}
          >
            <Image
              src={user?.profileImage}
              alt="Profile picture"
              borderRadius="full"
              // boxSize={"50%"}
              mx="auto"
              width={"50%"}
              height={"70%"}
            />
          </Box>
          <Box flexDir={{ base: "column" }} width>
            <Text fontWeight="bold" fontSize="lg" textAlign="center" mt={3}>
              {user?.name}
            </Text>
            <Text textAlign="center">{user?.city}</Text>
            <Button
              size="sm"
              colorScheme="teal"
              display="block"
              mx="auto"
              onClick={onOpen}
            >
              Edit Profile
            </Button>
            <Text textAlign="center" mt={4}>
              {user?.bio}
            </Text>
            <UnorderedList
              listStyleType="none"
              display="flex"
              justifyContent="space-between"
              p={4}
            >
              <ListItem>
                <Text fontWeight="bold">Posts</Text>
                <Text>{user?.recipes.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Friends</Text>
                <Text>{user?.friends.length}</Text>
              </ListItem>
              <ListItem>
                <Text fontWeight="bold">Saved Recipes</Text>
                <Text>{user?.savedRecipes.length}</Text>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>

        {/* User Posts and others */}
        <Box w={"70%"} m={"auto"}>
          {/* Grid View of Images */}
          <Tabs isFitted>
            <TabList>
              <Tab>Posts</Tab>
              <Tab>Saved Recipes</Tab>
              <Tab>Recent Likes</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {recipes?.length > 0 &&
                    recipes.map((ele, index) => (
                      <Tooltip label={`Likes: ${ele?.likes?.length}, Comments: ${ele?.comments?.length}`} key={index}>
                        <div>
                          <Image
                            src={`http://localhost:8080/${ele.images[0]}`}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                          />
                        </div>
                      </Tooltip>
                      // <h1>{ele.title}</h1>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {data.length > 0 &&
                    data.map((ele) => (
                      <Tooltip label={`Likes: 35, Comments: 77`}>
                        <div>
                          <Image
                            src={ele.image[0]}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                          />
                        </div>
                      </Tooltip>
                    ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {data.length > 0 &&
                    data.map((ele) => (
                      <Tooltip label={`Likes: 35, Comments: 77`}>
                        <div>
                          <Image
                            src={ele.image[0]}
                            alt="Recipe Image"
                            boxSize="100%"
                            objectFit="cover"
                          />
                        </div>
                      </Tooltip>
                    ))}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </Container>
  );
};

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    </Flex>
  );
}
