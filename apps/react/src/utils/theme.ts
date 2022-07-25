import { extendTheme, withDefaultProps } from '@chakra-ui/react';

const customTheme = extendTheme({
  components: {
    Input: {
      defaultProps: {
        borderColor: 'gray.400',
      },
    },
    Button: {
      defaultProps: {
        rounded: 'full',
      },
    },
  },
  colors: {
    dark: '#282B30',
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

export default customTheme;
