import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signup() {
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Heading fontFamily={'poppins'} size={'xl'}>
          Sign up.
        </Heading>
        <HStack>
          <Text>Already have an account?</Text>
          <Text color="twitter.500" as="a">
            <Link to={'/signin'}>Sign in.</Link>
          </Text>
        </HStack>
        <Divider colorScheme={'gray'} />
        <Box className="md:w-96 w-full">
          <form action="">
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Fullname</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'text'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'email'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'password'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Re-enter Password</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'password'}
                />
              </FormControl>
              <Checkbox>
                By signing up i agree to the privacy policy and terms of service
              </Checkbox>

              <Button
                borderRadius={'full'}
                colorScheme={'twitter'}
                type="submit"
              >
                Create account
              </Button>
              <HStack>
                <Divider />
                <Text whiteSpace={'nowrap'}>or continue with</Text>
                <Divider />
              </HStack>
              <Button
                borderRadius={'full'}
                variant={'outline'}
                borderColor={'gray.400'}
              >
                Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </AuthLayout>
  );
}
