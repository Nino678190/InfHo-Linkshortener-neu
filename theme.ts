"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  // Customize your theme here
  primaryColor: 'blue',
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  
  // Customize components
  components: {
    Button: {
      defaultProps: {
        color: 'blue',
      },
    },
    TextInput: {
      defaultProps: {
        variant: 'filled',
      },
      styles: {
        input: {
          borderRadius: '9999px', // Make inputs fully rounded
        },
      },
    },
  },
})