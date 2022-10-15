import {
  Avatar,
  Box,
  Text,
  Heading,
  HStack,
  IconButton,
  Stack,
  ButtonGroup,
  Divider,
} from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import axios from 'axios';
import { ReactNode, useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import TweetsCard from './atoms/TweetsCard';
import TweetVisited from './atoms/TweetVisited';

const ThreadLine = (props: { children?: ReactNode }) => (
  <div className="h-6 shrink-0  w-[90%] border-l-2 border-gray-300 border-dashed ">
    {props.children}
  </div>
);

export default function Tweets() {
  const [tweet, setTweet] = useState<ITweet>();
  const [replies, setReplies] = useState<ITweet[]>([]);
  const location = useLocation();
  console.log(replies);

  useEffect(() => {
    (async () => {
      await axios
        .get<ITweet>('/api/tweet/' + location.state)
        .then((res) => {
          setTweet(res.data);
          axios
            .get<ITweet[]>('/api/tweet/' + res.data._id + '/replies')
            .then((res) => setReplies(res.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, [location.pathname]);
  return (
    <>
      <Box
        className="backdrop-blur-lg z-20"
        bg={'whiteAlpha.800'}
        w={'full'}
        px={4}
        position={'absolute'}
      >
        <HStack spacing={3}>
          <IconButton
            onClick={() => window.history.back()}
            variant={'ghost'}
            aria-label="back"
            rounded={'full'}
            icon={<FiArrowLeft size={24} />}
          />
          <Heading p={4} size={'md'}>
            Tweet
          </Heading>
        </HStack>
      </Box>
      <Stack
        alignItems={'center'}
        spacing={0}
        overflowY={'scroll'}
        h="full"
        pt={12}
      >
        {tweet && <TweetVisited tweet={tweet} />}
        <Divider />
        <Stack divider={<Divider />} w={'full'}>
          {replies && replies.map((tweet) => <TweetsCard tweet={tweet} />)}
        </Stack>
      </Stack>
    </>
  );
}
