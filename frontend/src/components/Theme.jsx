import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Montserrat, sans-serif",
    caption: "Kaushan Script, sans-serif",
  },
  colors: {
    text: "#030302",
    background: "#ffffff",
    primary: {
      50: "#fef9e7",
      100: "#fde3a7",
      200: "#fbd982",
      300: "#f8c869",
      400: "#f6b251",
      500: "#fb8500",
      600: "#e97300",
      700: "#d16b00",
      800: "#b36300",
      900: "#8d5900",
    },
    secondary: "#8c8c8c",
    accent: "#e89c45",
  },
  components: {
    Input: {
      baseStyle: {
        border: "1px solid",
        borderColor: "secondary",
        _focus: {
          borderColor: "primary.500",
        },
      },
    },
    Button: {
      baseStyle: {
        _focus: { boxShadow: "none" },
      },
      sizes: {
        lg: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {
        solid: (props) => ({
          bg: "primary.500", // Use the colorScheme for background
          color: "background", // Text color
          _hover: {
            bg: `primary.600`,
            color: "background",
          },
        }),
        outline: (props) => ({
          border: `1px solid ${props.theme.colors.primary[500]}`,
          _hover: {
            border: `1px solid ${props.theme.colors.primary[600]}`,
            color: "primary.600", // Hover text color;
            background: "transparent",
          },
        }),
      },
    },
    // Define styles for headings (h1, h2, h3, h4, h5)
  },
});

export default theme;
