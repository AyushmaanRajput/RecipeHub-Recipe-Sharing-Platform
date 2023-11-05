import {
  Card,
  Box,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

export const Homecard = () => {
  return (
    <Card
      // w="350px"
      h="180px"
      textAlign="left"
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      boxShadow="lg"
    >
      <CardBody width="50%" p={4}>
        <Heading mb={2} size="sm" textTransform="uppercase">
          Name of recipe
        </Heading>

        <Text>35 MIN</Text>
        <Text>4 Serving</Text>
        <Text>4 Calories</Text>
      </CardBody>
      <Box width={"50%"}>
        <Image
          objectFit="cover"
          width={"100%"}
          height={"100%"}
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
        />
      </Box>
    </Card>
  );
};
