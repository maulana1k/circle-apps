import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './AppRouter';
import customTheme from '../utils/theme';

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <AppRouter />
    </ChakraProvider>
  );
};

export default App;
