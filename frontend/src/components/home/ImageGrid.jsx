import { Grid, GridItem, Image, Box, flexbox } from "@chakra-ui/react";
import React from "react";




const ImageGrid = () => {
  return (

    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" alignItems="center" flexDirection="column" mr={"10px"}>
        <Image src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/r5zc0u7fz74lhg7l09bt.jpg" alt="" width="100%" marginTop="50px" mb={"10px"} />
        <Image src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a0yv0qjk4433b9072j79.jpg" alt="" width="100%" />
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Image src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4id2tsqd9504crods063.jpg" alt="" width="100%" mb={"10px"} />
        <Image src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zbuqqc91vsxxr7xhsa5f.jpg" alt="" width="100%" marginBottom="50px" />
      </Box>
    </Grid>
    
  );
};

export default ImageGrid;
