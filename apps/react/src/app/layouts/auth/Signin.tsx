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
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';

export default function Signin() {
  const [l, setL] = useState<boolean>(false);
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Heading fontFamily={'poppins'} size={'xl'}>
          Sign in.
        </Heading>
        <HStack>
          <Text fontSize={'md'}>Don't have an account?</Text>
          <Text fontSize={'md'} color="twitter.500" as="a">
            <Link to={'/'}>Create one.</Link>
          </Text>
        </HStack>
        <Divider colorScheme={'gray'} />
        <Box className="md:w-96 w-full">
          <form action="">
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'email'}
                  disabled={l}
                  value="sample@gmail.com"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'password'}
                  disabled={l}
                  value={'awdnapwfnaw'}
                />
              </FormControl>
              <HStack justify={'space-between'}>
                <Checkbox>Remember me?</Checkbox>
                <Link to={'/forgot-password'}>
                  <Text color="twitter.500">Forgot password</Text>
                </Link>
              </HStack>
              <Button
                borderRadius={'full'}
                colorScheme={'twitter'}
                type="submit"
                isLoading={l}
                onClick={() => setL(true)}
                loadingText="Just a moment"
              >
                Sign in
              </Button>
              <HStack>
                <Divider />
                <Text whiteSpace={'nowrap'}>continue with</Text>
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
