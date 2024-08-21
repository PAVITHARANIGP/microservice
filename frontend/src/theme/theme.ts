import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f7f7f7",    // Very light gray (not part of the rainbow, for light backgrounds)
      100: "#f4c6c6",   // Light red
      200: "#f79c9c",   // Light coral
      300: "#f55b5b",   // Red
      400: "#f04e8a",   // Pink
      500: "#e955d4",   // Light purple
      600: "#b643f4",   // Purple
      700: "#6c43f4",   // Indigo
      800: "#4380f4",   // Blue
      900: "#43a2f4",   // Light blue
      1000: "#43f4b4",  // Light green
      1100: "#8dff43",  // Green
      1200: "#b8ff43",  // Yellow-green
      1300: "#f4f443",  // Yellow
      1400: "#f4c143",  // Orange
      1500: "#f47843",  // Light orange
    },
  },
  fonts: {
    heading: "Georgia, serif",
    body: "Arial, sans-serif",
  },
  fontSizes: {
    xl: "1.5rem",
    "2xl": "2rem",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      sizes: {
        md: {
          fontSize: "md",
          px: 4,
          py: 2,
        },
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
        },
        outline: {
          borderColor: "brand.500",
          color: "brand.500",
        },
      },
    },
  },
});

export default theme;
