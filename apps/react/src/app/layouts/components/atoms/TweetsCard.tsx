import {
  Avatar,
  Box,
  Divider,
  HStack,
  Flex,
  Stack,
  Text,
  useDisclosure,
  Container,
  Center,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FiMessageCircle, FiShare } from 'react-icons/fi';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ActionButton } from './ActionButton';
import TweetModal from './TweetModal';

export const LikeButton = (props: { count: number }) => (
  <ActionButton color="red.400" icon={<IoHeartOutline size={18} />}>
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

export default function TweetsCard(props: {
  hasPrev?: boolean;
  hasNext?: boolean;
  toReply?: boolean;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box bg={'white'} _hover={{ background: 'gray.50' }} px={3}>
      <TweetModal isOpen={isOpen} onClose={onClose} />
      <HStack alignItems={'stretch'} direction={'row'} spacing={3}>
        {props.hasPrev ? (
          <ReplyTrail hasNext={props.hasNext}>
            <Avatar />
          </ReplyTrail>
        ) : (
          <Avatar mt={3} />
        )}
        <Stack py={3} spacing={2}>
          <Link to={'/user/tweet/1'}>
            <Stack alignItems={'center'} direction={'row'}>
              <Text fontWeight={'bold'}>Display name</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                @username
              </Text>
              <Text color={'gray.500'} fontSize={'sm'}>
                &middot; 5 minutes ago
              </Text>
            </Stack>
            <Text>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse
              odit error nulla rerum beatae, quis, provident alias, vero dolores
              architecto facere unde in magni delectus. Laborum nihil eum
              deleniti temporibus?
            </Text>
          </Link>
          {!props.toReply ? (
            <Stack spacing={6} direction={'row'} alignItems={'center'} pt={2}>
              <LikeButton count={45} />
              <ReplyButton count={0} />
              <ShareButton count={12} />
            </Stack>
          ) : (
            <Text color={'gray.500'}>Replying to @username</Text>
          )}
        </Stack>
      </HStack>
    </Box>
  );
}
