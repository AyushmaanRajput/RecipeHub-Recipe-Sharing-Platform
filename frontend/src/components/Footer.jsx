import { Box, Flex, Heading, Icon, Text, Link } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaEnvelope , FaPinterest, FaLinkedin} from "react-icons/fa";

function Footer() {
  return (
    <Flex justifyContent="space-evenly" p={"30px 10px"} >
      <Box>
        <Heading as="h6" size="MD" marginBottom="16px">
            ABOUT NCG
          
        </Heading>
        <Text>Shop</Text>
        <Text>About</Text>
        <Text>Work with me</Text>
        <Text>Contact</Text>
      </Box>
      <Box>
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
            <Icon as={FaFacebook} boxSize={6} marginRight="16px" />
          </Link>
          <Link href="#">
            <Icon as={FaTwitter} boxSize={6} marginRight="16px" />
          </Link>
          <Link href="#">
            <Icon as={FaEnvelope} boxSize={6} marginRight="16px" />
          </Link>
          <Link href="#">
            <Icon as={FaPinterest} boxSize={6} marginRight="16px"  />
          </Link>
          <Link href="#">
            <Icon as={FaLinkedin} boxSize={6} marginRight="16px" />
          </Link>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Footer;
