import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Image,
  Grid,
  Select,
  HStack,
  Tag,
  TagCloseButton,
  RadioGroup,
  Radio,
  useToast,
} from "@chakra-ui/react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Text,
} from "@chakra-ui/react";
import { addNewRecipe } from "../../redux/recipeReducer/actions";

const cuisines = [
  "Mexican",
  "Italian",
  "Chinese",
  "Indian",
  "German",
  "Greek",
  "Filipino",
  "Japanese",
  "Other",
];

const tags = [
  "Healthy",
  "Vegan",
  "Dessert",
  "Spicy",
  "Quick",
  "Main Dish",
  "Appetizer",
  "Salad",
  "Soup",
];

const steps = [
  { title: "First", description: "Add Basic Recipe Information" },
  { title: "Second", description: "Add Igredients & Instructions" },
  { title: "Third", description: "Add Recipe Images" },
  { title: "Fourth", description: "Add Tags & Caption" },
];
export const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const token= useSelector((store)=>store.authReducer.token) || localStorage.getItem("token");

  const [step, setStep] = useState(1);
  const activeStepText = steps[step - 1].description;
  const [ingredient, setIngredient] = useState("");
  const [instruction, setInstruction] = useState("");
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    images: [],
    cuisine: [],
    tags: [],
    veg: false,
    caption: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayItemChange = (event, arrayName, index) => {
    const newArray = [...recipeData[arrayName]];
    newArray[index] = event.target.value;
    setRecipeData((prevData) => ({
      ...prevData,
      [arrayName]: newArray,
    }));
  };

  const handleAddArrayItem = (arrayName) => {
    setRecipeData((prevData) => ({
      ...prevData,
      [arrayName]: [...prevData[arrayName], ""],
    }));
  };

  const handleRemoveArrayItem = (arrayName, index) => {
    const newArray = [...recipeData[arrayName]];
    newArray.splice(index, 1);
    setRecipeData((prevData) => ({
      ...prevData,
      [arrayName]: newArray,
    }));
  };

  const handleCuisineChange = (event) => {
    setRecipeData((prevData) => ({
      ...prevData,
      cuisine: [...prevData.cuisine, event.target.value],
    }));
  };

  const handleCuisineRemove = (cuisine) => {
    setRecipeData((prevData) => ({
      ...prevData,
      cuisine: prevData.cuisine.filter((c) => c !== cuisine),
    }));
  };

  const handleTagsChange = (event) => {
    setRecipeData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, event.target.value],
    }));
  };

  const handleTagRemove = (tag) => {
    setRecipeData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((t) => t !== tag),
    }));
  };

  const handleVegChange = (value) => {
    setRecipeData((prevData) => ({
      ...prevData,
      veg: value === "true",
    }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setRecipeData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, ingredient],
    }));
    setIngredient((prev) => {
      return "";
    });
    setStep(2);
  };

  const handleAddInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, instruction],
    }));
    setInstruction((prev) => {
      return "";
    });
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Create a new FormData object
    const formData = new FormData();
  
    // Append text fields
    formData.append("title", recipeData.title);
    formData.append("description", recipeData.description);
    formData.append("veg", recipeData.veg.toString());
    formData.append("caption", recipeData.caption);
  
    // Append cuisine and tags as arrays
    recipeData.cuisine.forEach((cuisine, index) => {
      formData.append(`cuisine[${index}]`, cuisine);
    });
    recipeData.tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });
  
    // Append ingredients and instructions as arrays
    recipeData.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, ingredient);
    });
    recipeData.instructions.forEach((instruction, index) => {
      formData.append(`instructions[${index}]`, instruction);
    });
  
    // Append images
    recipeData.images.forEach((image, index) => {
      formData.append(`images`, image);
    });
  
    // Append additional fields as needed (likes, comments, time, rating, etc.)
  
    console.log(token, formData);
  
    // Now, you can dispatch the `addNewRecipe` action with `formData`
    dispatch(addNewRecipe(token, formData, toast, navigate));
  };
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={recipeData.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={recipeData.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cuisine</FormLabel>
              <Select
                placeholder="Select cuisines"
                value={recipeData.cuisine}
                onChange={handleCuisineChange}
              >
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </Select>
              <HStack
                display={"flex"}
                flexWrap={"wrap"}
                paddingY="2"
                spacing="2"
              >
                {recipeData.cuisine.map((cuisine) => (
                  <Tag key={cuisine} size="md">
                    {cuisine}
                    <TagCloseButton
                      onClick={() => handleCuisineRemove(cuisine)}
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel>Veg/Non-Veg</FormLabel>
              <RadioGroup
                name="veg"
                value={recipeData.veg.toString()}
                onChange={handleVegChange}
              >
                <HStack spacing="24px">
                  <Radio value={"true"}>Veg</Radio>
                  <Radio value={"false"}>Non-Veg</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Ingredients</FormLabel>
              <Input
                name="currentIngredient"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <Button onClick={handleAddIngredient}>Add Ingredient</Button>
              <HStack
                display={"flex"}
                flexWrap={"wrap"}
                paddingY="2"
                spacing="2"
              >
                {recipeData.ingredients.map((ingredient, index) => (
                  <Tag key={index} size="md">
                    {ingredient}
                    <TagCloseButton
                      onClick={() =>
                        handleRemoveArrayItem("ingredients", index)
                      }
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Instructions</FormLabel>
              <Textarea
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
              <Button onClick={handleAddInstruction}>Add Instruction</Button>
              <HStack
                display={"flex"}
                flexDir={"column"}
                paddingY="2"
                spacing="2"
              >
                {recipeData.instructions.map((instruction, index) => (
                  <Tag
                    key={index}
                    size="md"
                    width="100%"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    px={4}
                    py={2}
                  >
                    {`Step ${index + 1} : `}
                    {instruction}
                    <TagCloseButton
                      onClick={() =>
                        handleRemoveArrayItem("instructions", index)
                      }
                    />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
            <Button onClick={() => setStep(step - 1)}>Back</Button>
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Images</FormLabel>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
              />
              <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                {recipeData.images.map((image, index) => (
                  <Box key={index}>
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Image ${index}`}
                    />
                  </Box>
                ))}
              </Grid>
            </FormControl>
            <Button onClick={() => setStep(step - 1)}>Back</Button>
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          </Stack>
        );
      case 4:
        return (
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Select
                placeholder="Select tags"
                value={recipeData.tags}
                onChange={handleTagsChange}
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </Select>
              <HStack
                display={"flex"}
                flexWrap={"wrap"}
                paddingY="2"
                spacing="2"
              >
                {recipeData.tags.map((tag) => (
                  <Tag key={tag} size="md">
                    {tag}
                    <TagCloseButton onClick={() => handleTagRemove(tag)} />
                  </Tag>
                ))}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Caption</FormLabel>
              <Textarea
                name="caption"
                placeholder="Write a caption for your post"
                onChange={handleInputChange}
                // value={}
                // onChange={}
              />
            </FormControl>
            <Button onClick={() => setStep(step - 1)}>Back</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Stack mb={5}>
        <Stepper size="sm" index={step - 1} gap="0">
          {steps.map((step, index) => (
            <Step key={index} gap="0">
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator _horizontal={{ ml: "0" }} />
            </Step>
          ))}
        </Stepper>
        <Text>
          Step {step}: <b>{activeStepText}</b>
        </Text>
      </Stack>
      <form onSubmit={handleSubmit}>{renderStep()}</form>
    </div>
  );
};
