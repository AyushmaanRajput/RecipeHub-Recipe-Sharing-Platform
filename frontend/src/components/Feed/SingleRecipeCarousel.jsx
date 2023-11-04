import { Box, Flex, Text, Image, HStack, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const Carousel = ({ images, height="500px" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = images.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    marginLeft: `-${currentSlide * 100}%`,
  };

  return (
    <Flex
      width="95%"
      background="#edf3f8"
      borderRadius={"1rem"}
      overflow={"hidden"}
      alignItems="center"
      justifyContent="space-around"
    >
      <Flex width="100%" overflow="hidden" position="relative">
        <Flex height={height} width="100%" {...carouselStyle}>
          {images.map((image, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                padding="8px 12px"
                position="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={`${process.env.REACT_APP_API_URL}/${image}`}
                alt={`carousel image ${sid + 1}`}
                boxSize="full"
                backgroundSize="cover"
                w="100%"
                minHeight={"100%"}
                borderRadius="1rem"
                objectFit="cover"
              />
            </Box>
          ))}
        </Flex>
        <Text
          cursor="pointer"
          position="absolute"
          top="50%"
          transform={"translateY(-50%)"}
          padding="16px"
          color="white"
          fontWeight="bold"
          fontSize="18px"
          transition="0.6s ease"
          borderRadius="0 3px 3px 0"
          userSelect="none"
          left="0"
          onClick={prevSlide}
        >
          <Icon as={ChevronLeftIcon} fontSize={25} />
        </Text>
        <Text
          cursor="pointer"
          position="absolute"
          top="50%"
          transform={"translateY(-50%)"}
          padding="16px"
          color="white"
          fontWeight="bold"
          fontSize="18px"
          transition="0.6s ease"
          borderRadius="0 3px 3px 0"
          userSelect="none"
          right="0"
          onClick={nextSlide}
        >
          <Icon as={ChevronRightIcon} fontSize={25} />
        </Text>
        <HStack position="absolute" left="50%" bottom="1rem" width="100%">
          {images.map((_, slide) => (
            <Box
              transform="translateX(-50%)"
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", null, "15px"]}
              margin="0 2px"
              borderRadius="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              background={currentSlide === slide ? "#fff9" : "#fff4"}
              _hover={{
                background: "#fff4",
              }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
  );
};
