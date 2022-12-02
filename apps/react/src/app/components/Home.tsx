import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { ITweet } from '@circle-app/api-interfaces';
import { useState, useEffect, useContext } from 'react';
import { FiFile } from 'react-icons/fi';
import { Helmet } from 'react-helmet'

import { UserContext, UserContextType } from '../context/user.context';
import TweetsCard from './atoms/TweetsCard';
import { TweetField } from './TweetField';

export const ImageAttachment = (props: { src: string }) => {
  return <Image rounded={'2xl'} src={props.src} />;
};

export const FileAttachment = (props: { src: string }) => {
  return (
    <Stack
      direction={'row'}
      border={'1px'}
      borderColor="gray.100"
      rounded={'xl'}
      overflow={'hidden'}
    >
      <Flex p={3} bg={'gray.100'}>
        <FiFile size={20} />
      </Flex>
      <Box>{props.src}</Box>
    </Stack>
  );
};

export default function Home() {
  const { user } = useContext(UserContext) as UserContextType
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<ITweet[]>('/api/tweet/following/' + user.username);
        setTweets(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);
  return (
    <>
      <Helmet>
        <title>Home | Unsoedfess</title>
      </Helmet>
      <Box
        className="backdrop-blur-sm z-40"
        bg={'whiteAlpha.800'}
        w={'full'}
        position={'absolute'}
      >
        <Heading p={4} size={'md'}>
          Home
        </Heading>
      </Box>
      <Stack spacing={0} pt={14} overflowY={'scroll'} h={'full'} w={'full'}>
        <TweetField refresh={refresh} setRefresh={setRefresh} />
        <Divider />
        <Stack divider={<Divider />} spacing={0}>
          {tweets.map((item: ITweet) => (
            <TweetsCard key={item._id} tweet={item} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
