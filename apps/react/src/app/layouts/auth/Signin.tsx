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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { UserWithToken } from '@circle-app/api-interfaces';
import { UserContext, UserContextType } from '../../context/user.context';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoLogoGoogle } from 'react-icons/io5';

function Signin() {
  /**
   * use user context
   */
  const userContext = useContext(UserContext) as UserContextType;
  /**
   * form state
   */
  const [formData, setFormData] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    { username: '', email: '', password: '' }
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const toast = useToast();
  const navigate = useNavigate();

  /**
   * Form handler to change state
   */
  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isEmail = String(value).match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
    if (isEmail) {
      return setFormData({ email: value });
    }
    setFormData({ [name]: value });
  };

  /**
   *  Post  data to login api
   */
  const signin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post<UserWithToken>('/api/auth/signin', formData);
      toast({
        title: 'Signin success',
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
      userContext.dispatcher(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/', { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: error.response?.data as string,
          status: 'error',
          duration: 5000,
          position: 'top-right',
        });
      }
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <Stack spacing={4}>
        <Heading fontFamily={'poppins'} size={'xl'}>
          Sign in.
        </Heading>
        <HStack>
          <Text fontSize={'md'}>Don't have an account?</Text>
          <Text fontSize={'md'} color="twitter.500">
            <Link to={'/signup'}>Create one.</Link>
          </Text>
        </HStack>
        <Divider colorScheme={'gray'} />
        <Box className="md:w-96 w-full">
          <form onSubmit={signin}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username or Email</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  name={'username'}
                  disabled={loading}
                  onChange={formHandler}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor={'gray.400'}
                    name={'password'}
                    borderRadius={'full'}
                    type={isHidden ? 'password' : 'text'}
                    disabled={loading}
                    onChange={formHandler}
                  />
                  <InputRightElement>
                    <Button
                      onClick={() => setIsHidden(!isHidden)}
                      variant={'link'}
                    >
                      {isHidden ? <FiEyeOff /> : <FiEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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
                isLoading={loading}
                loadingText="Just a moment"
              >
                Sign in
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

export default Signin;
