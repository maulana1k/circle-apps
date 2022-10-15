import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { FiAtSign, FiFile, FiImage, FiLink, FiVideo } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../context/user.context';

import AttachButton from './atoms/CustomButton';
import TweetsCard from './atoms/TweetsCard';

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

export const TweetField = (props: {
  refresh?: boolean;
  setRefresh?: any;
  replyTo?: string | undefined;
}) => {
  const { user } = useContext(UserContext) as UserContextType;
  const [tweetContent, setTweetContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandle = (e: any) => {
    const input = e.target.value;
    setTweetContent(input);
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 4}px`;
  };

  const postTweet = async () => {
    setLoading(true);
    if (tweetContent) {
      axios
        .post(
          '/api/tweet/new',
          { userId: user._id, content: tweetContent.trim() },
          { headers: { authorization: 'Bearer ' + user.token } }
        )
        .then((res) => {
          setTweetContent('');
          props?.setRefresh(!props?.refresh);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  };
  const replyTweet = async () => {
    setLoading(true);
    if (tweetContent) {
      axios
        .post(
          '/api/tweet/' + props.replyTo + '/reply',
          { userId: user._id, content: tweetContent.trim() },
          { headers: { authorization: 'Bearer ' + user.token } }
        )
        .then(() => {
          setTweetContent('');
          props?.setRefresh(!props?.refresh);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLoading(false);
  };
  return (
    <Stack className="px-4" w="full" display={'flex'} spacing={3}>
      <Stack direction={'row'}>
        <Avatar src={user.avatar} />
        <Stack alignItems={'start'} pb={2} spacing={1} w={'full'}>
          <Textarea
            onInput={(e: any) => inputHandle(e)}
            value={tweetContent}
            border={'none'}
            w={'full'}
            resize="none"
            rows={2}
            wrap="hard"
            focusBorderColor="none"
            placeholder="What do you think?"
            className="placeholder:text-xl  placeholder:text-gray-500 "
          />
          <Divider />
          <Stack
            alignItems={'center'}
            direction={'row'}
            justifyContent={'space-between'}
            p={1}
            w={'full'}
          >
            <Stack spacing={0} direction={'row'}>
              <AttachButton icon={<FiImage />} />
              <AttachButton icon={<FiLink />} />
              <AttachButton icon={<FiAtSign />} />
            </Stack>
            <Button
              disabled={!tweetContent}
              loadingText={'Posting your tweet'}
              size={'sm'}
              colorScheme={'twitter'}
              rounded="full"
              onClick={!props.replyTo ? postTweet : replyTweet}
            >
              Tweet
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default function Home() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [refresh, setRefresh] = useState(false);
  // console.log(tweets);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<ITweet[]>('/api/tweet?size=15&offset=0');
        setTweets(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);
  return (
    <>
      <Box
        className="backdrop-blur-lg z-40"
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
            <TweetsCard tweet={item} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
