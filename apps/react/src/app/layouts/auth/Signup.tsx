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
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoLogoGoogle } from 'react-icons/io5';
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
                <FormLabel>Username</FormLabel>
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
                <FormLabel>Birth</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'date'}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor={'gray.400'}
                    borderRadius={'full'}
                    type={'password'}
                  />
                  <InputRightElement>
                    <Button variant={'link'}>
                      <FiEyeOff />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* <FormControl>
                <FormLabel>Re-enter Password</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'password'}
                />
              </FormControl> */}
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
              <Button
                borderRadius={'full'}
                variant={'outline'}
                borderColor={'gray.400'}
                iconSpacing={2}
                leftIcon={<IoLogoGoogle />}
              >
                Sign up with Google
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </AuthLayout>
  );
}
