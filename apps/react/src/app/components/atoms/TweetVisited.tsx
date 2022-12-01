import {
  Box,
  Stack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import axios from 'axios';
import moment from 'moment';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/user.context';
import TweetModal from './TweetModal';
import { LikeButton, ReplyButton, ShareButton } from './TweetsCard';

export default function TweetVisited({ tweet }: { tweet: ITweet }) {
  const { user } = useContext(UserContext) as UserContextType;
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(tweet.likes.length);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const likeTweet = async (e: any) => {
    e.stopPropagation();
    const action = isLiked ? '/unlike/' : '/like/';
    axios
      .post('/api/tweet/' + tweet._id + action + user._id)
      .then(() => {
        setIsLiked(!isLiked);
        if (isLiked) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(likeCount + 1);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box w={'full'} bg={'white'} p={3}>
      <TweetModal replyTo={tweet} isOpen={isOpen} onClose={onClose} />
      <Stack spacing={4}>
        <HStack spacing={2}>
          <Avatar src={tweet.author.avatar} />
          <Stack spacing={0}>
            <Link to={'/' + tweet.author.username} >
              <Text _hover={{ textDecoration: 'underline' }} fontWeight={'bold'}>{tweet.author.displayName}</Text>
            </Link>
            <Text color={'gray.500'}>
              @{tweet.author.username}
            </Text>
          </Stack>
        </HStack>
        <Text whiteSpace={'pre-wrap'}>{tweet.content}</Text>
        {
          tweet.image && <Image src={tweet.image} borderRadius={'xl'} />
        }
        <Text fontWeight={400} color={'gray.500'} fontSize={'sm'}>
          {moment(tweet.timestamp.toString()).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
        <Divider />
      </Stack>

      <Stack
        justifyContent={'center'}
        direction={'row'}
        alignItems={'center'}
        pt={4}
        spacing={8}
      >
        <LikeButton
          onClick={(e: any) => likeTweet(e)}
          isActive={isLiked}
          count={likeCount}
        />
        <ReplyButton handleClick={onOpen} count={0} />
        <ShareButton count={0} />
      </Stack>
    </Box>
  );
}
