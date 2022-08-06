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
import { ReactNode } from 'react';
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TweetsCard from './atoms/TweetsCard';
import TweetVisited from './atoms/TweetVisited';

const ThreadLine = (props: { children?: ReactNode }) => (
  <div className="h-6 shrink-0  w-[90%] border-l-2 border-gray-300 border-dashed ">
    {props.children}
  </div>
);

export default function Tweets() {
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
        <TweetVisited />
        {[1, 2, 3, 4, 5].map((i) => (
          <>
            <Divider />
            <TweetsCard />
          </>
        ))}
      </Stack>
    </>
  );
}
