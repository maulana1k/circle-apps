import { ChakraProvider } from '@chakra-ui/react';
import AppRouter from './router/AppRouter';
import customTheme from '../utils/theme';
import ContextProvider from './context/user.context';

export const App = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <ContextProvider>
        <AppRouter />
      </ContextProvider>
    </ChakraProvider>
  );
};

export default App;
