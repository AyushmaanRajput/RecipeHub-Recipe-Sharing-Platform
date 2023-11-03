import React from 'react';
import { Box, Image, Text, Flex, Button, Heading } from '@chakra-ui/react';

const InfoCard = ({img,direction}) => {
  return (
    <Flex
    margin="auto"
    // border="1px solid black"
    direction={direction}
   mt="50px"
      p={4}
    width="80%"
      alignItems="center"
      gap="30px"
    >
      <Image
        src="https://cdn.loveandlemons.com/wp-content/uploads/2020/12/plant-based-recipes.jpg"
        alt="Sample Image"
        boxSize="250px"
        objectFit="cover"
        mr={4}
      />
      <Box>
      <Heading  size='mg'>
    About
  </Heading>
        <Heading fontWeight="bold" >HEALTHY AND QUALITY <br/> WITH A NEW FEEL</Heading>
        <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit id et est eveniet officiis. Quos, ut natus quidem voluptas ducimus quis esse ullam dolor architecto reiciendis porro tempore suscipit animi.</Text>
        <Text color="gray.600"></Text>
        <Button>Explore More</Button>
      </Box>
    </Flex>
  );
};

export default InfoCard;
