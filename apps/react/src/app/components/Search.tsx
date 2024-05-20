import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { IUser } from '@circle-app/api-interfaces';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
import { UserContext, UserContextType } from '../context/user.context';
import UserList from './atoms/UserList';

export default function Search() {
  const { user } = useContext(UserContext) as UserContextType;
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [userQuery, setUserQuery] = useState<string>('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    setUserQuery(query);
    if (query) {
      console.log('search ', query);

      const res = await axios.get<IUser[]>('/api/users/search/' + query, {
        headers: { authorization: 'Bearer ' + user.token },
      });
      setUsersData(res.data);
    }
  };
  return (
    <div className="flex w-1/3 px-4 z-20 ">
      <Stack pt={4} w={'full'} spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents={'none'} children={<FiSearch />} />
          <Input
            type={'search'}
            borderRadius={'full'}
            variant={'filled'}
            width="full"
            placeholder="Search on Circle"
            onInput={handleSearch}
          />
        </InputGroup>
        {usersData.length && userQuery && (
          <Box p={4} rounded={'2xl'} bg={'gray.100'}>
            <Stack spacing={4} overflowY={'scroll'} maxH={'lg'}>
              {usersData.map((user: IUser) => (
                <UserList key={user._id} user={user} />
              ))}
            </Stack>
          </Box>
        )}
        <Stack overflowY={'scroll'} h={'full'}>
          <Box p={4} rounded={'2xl'} bg={'gray.100'}>
            <TwitterTimelineEmbed sourceType='profile' screenName={'Unsoedfess1963'} />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
