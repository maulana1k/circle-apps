import {
  Box,
  Stack,
  HStack,
  Avatar,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { LikeButton, ReplyButton, ShareButton } from './TweetsCard';

export default function TweetVisited() {
  return (
    <Box bg={'white'} p={3}>
      <Stack spacing={4}>
        <HStack spacing={2}>
          <Avatar />
          <Stack spacing={0}>
            <Text fontWeight={'bold'}>Display name</Text>
            <Text color={'gray.500'}>
              @username &middot;
              <Button variant={'link'} colorScheme={'twitter'}>
                Follow
              </Button>
            </Text>
          </Stack>
        </HStack>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse odit
          error nulla rerum beatae, quis, provident alias, vero dolores
          architecto facere unde in magni delectus. Laborum nihil eum deleniti
          temporibus?
        </Text>
        <Text fontWeight={400} color={'gray.500'} fontSize={'sm'}>
          13:56 &middot; Jun 13, 2022
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
        <LikeButton count={45} />
        <ReplyButton count={0} />
        <ShareButton count={0} />
      </Stack>
    </Box>
  );
}
