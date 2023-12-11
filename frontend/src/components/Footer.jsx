import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  Link,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPinterest,
  FaLinkedin,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Footer() {

  const location = useLocation();

  if(location.pathname === "/admin") {
    return
  }

  return (
    <>
      <Divider orientation="horizontal" marginy="2rem" borderRadius="full" />
      <Box width="min(80rem,100%)" mx="auto" py={10} color="text" px={4}>
        <Text
          fontFamily={"Kaushan Script"}
          fontSize="2xl"
          fontWeight="bold"
          marginBottom="2rem"
        >
          Recipe
          <Text display="inline" color="primary.500">
            Hub
          </Text>
        </Text>
        <Flex
          wrap={'wrap'}
          gap={4}
          justifyContent="space-between"
        >
          <Box>
            <Heading as="h6" size="MD" marginBottom="16px">
              ABOUT NCG
            </Heading>
            <Text>Shop</Text>
            <Text>About</Text>
            <Text>Work with me</Text>
            <Text>Contact</Text>
          </Box>
          <Box p={0} mr={4}>
            <Heading as="h6" size="MD" marginBottom="16px">
              EXPLORE
            </Heading>
            <Text>Recipes</Text>
            <Text>Fitness</Text>
            <Text>Healthy living</Text>
            <Text>Blogs</Text>
          </Box>
          <Box>
            <Heading as="h6" size="md" marginBottom="16px">
              Connect
            </Heading>
            <Flex alignItems="center">
              <Link href="#">
                <Icon
                  as={FaFacebook}
                  boxSize={6}
                  marginRight="16px"
                  transition="0.2s ease-in"
                  _hover={{ color: "primary.500" }}
                />
              </Link>
              <Link href="#">
                <Icon
                  as={FaTwitter}
                  transition="0.2s ease-in"
                  _hover={{ color: "primary.500" }}
                  boxSize={6}
                  marginRight="16px"
                />
              </Link>
              <Link href="#">
                <Icon
                  as={FaEnvelope}
                  transition="0.2s ease-in"
                  _hover={{ color: "primary.500" }}
                  boxSize={6}
                  marginRight="16px"
                />
              </Link>
              <Link href="#">
                <Icon
                  as={FaPinterest}
                  transition="0.2s ease-in"
                  _hover={{ color: "primary.500" }}
                  boxSize={6}
                  marginRight="16px"
                />
              </Link>
              <Link href="#">
                <Icon
                  as={FaLinkedin}
                  transition="0.2s ease-in"
                  _hover={{ color: "primary.500" }}
                  boxSize={6}
                  marginRight="16px"
                />
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Footer;
