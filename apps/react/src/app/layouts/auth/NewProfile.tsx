import {
  Avatar,
  AvatarBadge,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Stack,
  Grid,
  GridItem,
  HStack,
  Center,
} from '@chakra-ui/react';
import { FiCheck, FiImage } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import { UserContext, UserContextType } from '../../context/user.context';
import AuthLayout from './AuthLayout';
import axios from 'axios';
import { IUser } from '@circle-app/api-interfaces';
import { uploadFiles } from '../../hooks/useFirebase';

export default function NewProfile() {
  const { user, dispatcher } = useContext(UserContext) as UserContextType;
  /**
   * Avatar props
   */
  const [displayName, setDisplayName] = useState(user.username);
  const [avatar, setAvatar] = useState<string>('');
  const [customAvatar, setCustomAvatar] = useState<string>('');
  const [file, setFile] = useState<Blob>();
  const [loading, setLoading] = useState<boolean>(false);
  const [avatarList] = useState<string[]>([
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-1.png?alt=media&token=c61c6266-18b2-4a6f-8be7-ac115fbb6dbc',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-2.png?alt=media&token=615791f5-6f44-435d-8b3f-ffa6b0147dea',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-3.png?alt=media&token=de03119f-38d6-42f4-989a-0b7bb6119de7',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-4.png?alt=media&token=2fa60d38-b1d4-4cd1-986e-2590e94fbab6',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-5.png?alt=media&token=817d2e8d-1e17-493d-be79-9150d328b562',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-6.png?alt=media&token=f703938c-1058-476f-bf7d-e9b34020ddd6',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-7.png?alt=media&token=aef36133-07a5-4527-b22f-7d2c34cab996',
    'https://firebasestorage.googleapis.com/v0/b/nx-app-bcf16.appspot.com/o/images%2Fdefault-avatar%2Fpeep-8.png?alt=media&token=6390d582-9383-45d7-9823-e6c797c86aa5',
  ]);
  const navigate = useNavigate();
  const fileHandle = (e: any) => {
    if (e.target.files[0].size > 2 * 1024 * 1024) {
      alert('Image size too large!');
      return;
    }
    setFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setAvatar(url);
    setCustomAvatar(url);
  };
  /**
   * Update user profile
   */
  const update = async () => {
    setLoading(true);
    let avatarUrl;
    try {
      if (avatar === customAvatar && file) {
        const fileUrl = await uploadFiles(
          file,
          'images/users/avatar/' + user.username + '.jpg'
        );
        avatarUrl = fileUrl;
      } else {
        avatarUrl = avatar;
      }
      console.log('ava', avatarUrl);
      const dp = displayName || user.username;
      const data = { ...user, displayName: dp, avatar: avatarUrl };
      const res = await axios.put<IUser>('/api/auth/update-profile', data);
      console.log(res.data);
      dispatcher({ ...res.data, token: user.token });
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    // <div className=" flex flex-col justify-center items-center w-full h-screen">
    <AuthLayout>
      <Stack spacing={4} alignItems={'center'}>
        <Avatar size={'2xl'} src={avatar} />
        <HStack>
          <Grid templateColumns={'repeat(5, 1fr)'} gap={5}>
            {avatarList.map((v) => (
              <GridItem key={v} onClick={() => setAvatar(v)}>
                <Avatar
                  className="hover:scale-125 cursor-pointer duration-200"
                  size={'lg'}
                  outline={avatar == v ? 'solid 3px' : '0px'}
                  outlineColor={'green.400'}
                  outlineOffset={2}
                  src={v}
                >
                  {avatar == v && (
                    <AvatarBadge
                      boxSize="1.25em"
                      bg="green.400"
                      color={'white'}
                    >
                      <FiCheck size={16} />
                    </AvatarBadge>
                  )}
                </Avatar>
              </GridItem>
            ))}
            {file && (
              <GridItem onClick={() => setAvatar(customAvatar)}>
                <Avatar
                  className="hover:scale-125 cursor-pointer duration-200"
                  size={'lg'}
                  outline={avatar == customAvatar ? 'solid 3px' : '0px'}
                  outlineColor={'green.400'}
                  outlineOffset={2}
                  src={customAvatar}
                >
                  {avatar === customAvatar && (
                    <AvatarBadge
                      boxSize="1.25em"
                      bg="green.400"
                      color={'white'}
                    >
                      <FiCheck size={16} />
                    </AvatarBadge>
                  )}
                </Avatar>
              </GridItem>
            )}
            <GridItem>
              <input
                hidden
                type="file"
                name="avatar"
                onInput={fileHandle}
                onLoadCapture={fileHandle}
                id="avatar"
                accept="*.img"
              />
              <label htmlFor="avatar">
                <Flex
                  justifyContent={'center'}
                  bg={'twitter.400'}
                  h="full"
                  color={'white'}
                  rounded={'full'}
                  cursor={'pointer'}
                  className="hover:scale-125 cursor-pointer duration-200"
                >
                  <Center>
                    <FiImage size={30} />
                  </Center>
                </Flex>
              </label>
            </GridItem>
          </Grid>
        </HStack>
        <FormControl>
          <FormLabel>Display name</FormLabel>
          <Input
            borderColor={'gray.400'}
            borderRadius={'full'}
            type={'text'}
            maxLength={20}
            name={'displayName'}
            placeholder={'default using ' + user.username}
            value={displayName}
            onChange={(e: any) => setDisplayName(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={update}
          w={'full'}
          isLoading={loading}
          borderRadius={'full'}
          colorScheme={'twitter'}
        >
          Next
        </Button>
        <Link to={'/'}>
          <Button rounded={'full'} variant={'link'}>
            skip for now
          </Button>
        </Link>
      </Stack>
    </AuthLayout>
    // </div>
  );
}
