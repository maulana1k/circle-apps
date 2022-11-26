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
import { UserWithToken } from '@circle-app/api-interfaces';
import axios from 'axios';
import { ChangeEvent, FormEventHandler, useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoLogoGoogle } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/user.context';
import AuthLayout from './AuthLayout';

export default function Signup() {
  const userContext = useContext(UserContext) as UserContextType;
  /**
   * Form state
   */
  type FormData = {
    username: string;
    email: string;
    birth: string;
    password: string;
  };
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    birth: '',
    password: '',
  });
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();
  /**
   * Form handler to change state
   */
  const formHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /**
   * Post data to register api
   */
  const signup: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post<UserWithToken>('/api/auth/signup', formData);
      userContext.dispatcher(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/signup/new-profile', { replace: true });
      toast({
        title: 'Create account success',
        status: 'success',
        duration: 5000,
        position: 'top-right',
      });
    } catch (error) {
      console.log(error);

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
          Sign up.
        </Heading>
        <HStack>
          <Text>Already have an account?</Text>
          <Text color="twitter.500">
            <Link to={'/signin'}>Sign in.</Link>
          </Text>
        </HStack>
        <Divider colorScheme={'gray'} />
        <Box className="md:w-96 w-full">
          <form onSubmit={signup}>
            <Stack spacing={3}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'text'}
                  onChange={formHandler}
                  name={'username'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'email'}
                  onChange={formHandler}
                  name={'email'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Birth</FormLabel>
                <Input
                  borderColor={'gray.400'}
                  borderRadius={'full'}
                  type={'date'}
                  onChange={formHandler}
                  name={'birth'}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    borderColor={'gray.400'}
                    borderRadius={'full'}
                    type={isHidden ? 'password' : 'text '}
                    onChange={formHandler}
                    name={'password'}
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
              <Checkbox isChecked>
                By signing up i agree to the privacy policy and terms of service
              </Checkbox>
              <Button
                borderRadius={'full'}
                colorScheme={'twitter'}
                type="submit"
                isLoading={loading}
                loadingText={'Just a moment'}
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
