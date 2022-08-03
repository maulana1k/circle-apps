import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from '@chakra-ui/react';
import AuthLayout from './AuthLayout';

export default function ForgotPassword() {
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Heading fontFamily={'poppins'} size={'xl'}>
          Reset password
        </Heading>
        <HStack>
          <Text whiteSpace={'normal'} fontSize={'md'}>
            We will send a OTP code to your email and you'll be able to <br />{' '}
            reset and create new password.
          </Text>
        </HStack>
        <Divider colorScheme={'gray'} />
        <Box className="md:w-96 w-full">
          <form action="">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email to recover</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'email'}
                  value="sample@gmail.com"
                />
              </FormControl>
              <FormControl>
                <FormLabel>OTP code</FormLabel>
                <HStack justify={'center'}>
                  <PinInput>
                    <PinInputField borderColor={'gray.400'} />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
              </FormControl>
              <Button
                borderRadius={'full'}
                colorScheme={'twitter'}
                type="submit"
                loadingText="Just a moment"
              >
                Send OTP
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </AuthLayout>
  );
}
