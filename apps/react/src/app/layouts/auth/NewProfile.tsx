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
import { Link } from 'react-router-dom';

import { peepsImport } from 'apps/react/src/assets/img';
import AuthLayout from './AuthLayout';
import { useContext, useState } from 'react';
import { UserContext, UserContextType } from '../../context/user.context';

export default function NewProfile() {
  const { user } = useContext(UserContext) as UserContextType;
  /**
   * Avatar props
   */
  const [displayName, setDisplayName] = useState(user.user.username);
  const [avatar, setAvatar] = useState('default');
  const [avaSrc, setAvaSrc] = useState('');
  const [file, setFile] = useState('');
  /**
   * Change avatar
   */
  const changeAvatar = (k: any, v: any) => {
    setAvatar(k);
    setAvaSrc(v);
  };
  const fileHandle = (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setFile(url);
  };

  return (
    <AuthLayout>
      <Stack spacing={6} alignItems={'center'}>
        <Avatar size={'2xl'} src={avaSrc} />
        <HStack>
          <Grid templateColumns={'repeat(5, 1fr)'} gap={5}>
            {Object.entries(peepsImport).map(([k, v]) => (
              <GridItem onClick={() => changeAvatar(k, v)}>
                <Avatar
                  className="hover:scale-125 cursor-pointer duration-200"
                  size={'lg'}
                  outline={avatar == k ? 'solid 3px' : '0px'}
                  outlineColor={'green.400'}
                  outlineOffset={2}
                  src={v}
                >
                  {avatar == k && (
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
              <GridItem onClick={() => changeAvatar('file', file)}>
                <Avatar
                  className="hover:scale-125 cursor-pointer duration-200"
                  size={'lg'}
                  outline={avatar == 'file' ? 'solid 3px' : '0px'}
                  outlineColor={'green.400'}
                  outlineOffset={2}
                  src={file}
                >
                  {avatar == 'file' && (
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
            name={'displayName'}
            placeholder={'default using ' + user.user.username}
            value={displayName}
            onChange={(e: any) => setDisplayName(e.target.value)}
          />
        </FormControl>
        <Button w={'full'} borderRadius={'full'} colorScheme={'twitter'}>
          Next
        </Button>
        <Button variant={'link'}>
          <Link to={'/'}>skip for now</Link>
        </Button>
      </Stack>
    </AuthLayout>
  );
}
