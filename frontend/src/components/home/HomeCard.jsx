import {
  Card,
  Box,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Homecard = ({ image, name, key }) => {
  return (
    <Card
      // w="350px"
      h={{ lg: "180px", base: "auto" }}
      textAlign="left"
      direction={{ base: "column-reverse", sm: "row" }}
      overflow="hidden"
      boxShadow="lg"
    >
      <CardBody width={{ lg: "50%", md: "70%", base: "100%" }} p={4}>
        <Heading mb={2} size="sm" textTransform="uppercase">
          {name}
        </Heading>

        <Text>{Math.floor(Math.random() * (30 - 15 + 15))} Min</Text>
        <Text>{Math.floor(Math.random() * (5 - 1 + 1)) + 1} Serving</Text>
        <Text>{Math.floor(Math.random() * (20 - 10 + 1)) + 10} Calories</Text>
      </CardBody>
      <Box width={{ lg: "50%", md: "70%", base: "100%" }}>
        <Image
          objectFit="cover"
          width={"100%"}
          height={"100%"}
          minH={"100px"}
          src={image}
          // src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
        />
      </Box>
    </Card>
  );
};
