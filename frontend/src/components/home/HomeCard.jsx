import { Card, CardBody, Heading, Image, Stack, Text } from "@chakra-ui/react";

export const Homecard = () => {
    return (
      <Card
        w="350px"
        h="150px"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack>
          <CardBody>
            <Heading size="md">Name of recipe</Heading>
  
            <Text py="0.5">35 MIN</Text>
            <Text py="0.5">4 Serving</Text>
            <Text py="0.5">4 Calories</Text>
          </CardBody>
        </Stack>
        <Image
          objectFit="cover"
          width=""
          borderRadius="10px"
         
          
          src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
        />
      </Card>
    );
  };
  
