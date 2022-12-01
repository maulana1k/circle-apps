import {
  Avatar,
  Box,
  HStack,
  Flex,
  Stack,
  Text,
  Center,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { ITweet } from '@circle-app/api-interfaces';
import axios from 'axios';
import moment from 'moment';
import { ReactNode, useContext, useState, useEffect, ButtonHTMLAttributes } from 'react';
import { FiDelete, FiMessageCircle, FiMoreHorizontal, FiMoreVertical, FiShare, FiTrash } from 'react-icons/fi';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/user.context';

import { ActionButton } from './ActionButton';


export const LikeButton = (props: {
  count: number;
  isActive?: boolean;
  onClick?: any;
}) => (
  <ActionButton
    handleClick={props.onClick}
    isActive={props.isActive}
    color="red.400"
    icon={props.isActive ? <IoHeart size={18} /> : <IoHeartOutline size={18} />}
  >
    {props.count > 0 ? `${props.count} likes` : 'Like'}
  </ActionButton>
);
export const ReplyButton = (props: {
  handleClick?: (x: any) => void;
  count: number;
}) => (
  <ActionButton
    handleClick={props.handleClick}
    color="blue.400"
    icon={<FiMessageCircle size={18} />}
  >
    {props.count > 0 ? `${props.count} replies` : 'Reply'}
  </ActionButton>
);
export const ShareButton = (props: { count: number }) => (
  <ActionButton color="green.400" icon={<FiShare size={18} />}>
    {props.count > 0 ? `${props.count} share` : 'Share'}
  </ActionButton>
);

const ReplyTrail = (props: { children: ReactNode; hasNext?: boolean }) => (
  <Flex pt={0} alignItems={'center'} direction={'column'} w={'auto'}>
    <Center
      mb={2}
      w={0}
      borderLeft={'2px'}
      borderColor={'gray.300'}
      h={'6'}
    ></Center>
    {props.children}
    {props.hasNext && (
      <Center
        mt={2}
        w={0}
        borderLeft={'2px'}
        borderColor={'gray.300'}
        h={'full'}
      ></Center>
    )}
  </Flex>
);

interface ITweetCard {
  tweet: ITweet;
  hasPrev?: boolean;
  hasNext?: boolean;
  toReply?: boolean;
  self?: boolean;
}

export default function TweetsCard({
  tweet,
  hasPrev,
  hasNext,
  toReply,
  self
}: ITweetCard) {
  const { user } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(tweet.likes.length);
  const [repliesCount, setRepliesCount] = useState(0);
  const [deleted, setDeleted] = useState(false)
  const visitTweet = (e: any) => {
    e.stopPropagation();
    return navigate('/' + tweet.author.username + '/tweet/' + tweet._id, {
      state: tweet._id,
    });
  };

  const likeTweet = async (e: any) => {
    e.stopPropagation();
    const action = isLiked ? '/unlike/' : '/like/';
    axios
      .post('/api/tweet/' + tweet._id + action + user._id)
      .then(() => {
        setIsLiked(!isLiked);
        if (isLiked) setLikeCount(likeCount - 1);
        else setLikeCount(likeCount + 1);
      })
      .catch((err) => console.log(err));
  };
  const deleteTweet = (e: any) => {
    e.stopPropagation();
    axios
      .delete('/api/tweet/' + tweet._id)
      .then(() => setDeleted(true))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    axios
      .get<ITweet[]>('/api/tweet/' + tweet._id + '/replies')
      .then((res) => {
        setRepliesCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tweet._id]);
  if (deleted) return null;
  return (
    <Box
      bg={'white'}
      transition={'ease-in-out'}
      transitionProperty={'all'}
      _hover={{ background: 'gray.50' }}
      px={5}
      cursor={'pointer'}
    >
      <HStack alignItems={'stretch'} direction={'row'} spacing={3}>
        <Link to={'/' + tweet.author.username}>
          {hasPrev ? (
            <ReplyTrail hasNext={hasNext}>
              <Avatar src={tweet.author.avatar} />
            </ReplyTrail>
          ) : (
            <Avatar src={tweet.author.avatar} mt={3} />
          )}
        </Link>
        <Stack w={'full'} onClick={visitTweet} py={3} spacing={0}>
          <HStack  >
            <Stack alignItems={'center'} direction={'row'}>
              <Link onClick={(e) => e.stopPropagation()} to={'/' + tweet.author.username}>
                <Text _hover={{ textDecoration: 'underline' }} fontWeight={'bold'}>{tweet.author.displayName}</Text>
              </Link>
              <Text fontSize={'sm'} color={'gray.500'}>
                @{tweet.author.username}
              </Text>
              <Text color={'gray.500'} fontSize={'sm'}>
                &middot; {moment(tweet.timestamp.toString()).fromNow()}
              </Text>
            </Stack>
            {
              self && (
                <Menu>
                  <MenuButton onClick={(e) => e.stopPropagation()} as={IconButton} icon={<FiMoreHorizontal />} variant='ghost' />
                  <MenuList >
                    <MenuItem onClick={deleteTweet} color={'red'} icon={<FiTrash />}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              )
            }
          </HStack>
          <Text whiteSpace={'pre-wrap'}>{tweet.content}</Text>
          <Image borderRadius={'xl'} src={tweet.image} />
          {!toReply ? (
            <Stack spacing={6} direction={'row'} alignItems={'center'} pt={2}>
              <LikeButton
                onClick={(e: any) => likeTweet(e)}
                isActive={isLiked}
                count={likeCount}
              />
              <ReplyButton count={repliesCount} />
              <ShareButton count={0} />
            </Stack>
          ) : (
            <Text color={'gray.500'}>Replying to @{tweet.author.username}</Text>
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
