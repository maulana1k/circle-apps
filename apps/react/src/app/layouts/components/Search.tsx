import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { TwitterTweetEmbed } from 'react-twitter-embed';

export default function Search() {
  return (
    <div className="flex w-1/3 px-4 z-20 ">
      <Stack pt={4} w={'full'} spacing={4}>
        <InputGroup>
          <InputLeftElement pointerEvents={'none'} children={<FiSearch />} />
          <Input
            borderRadius={'full'}
            variant={'filled'}
            width="full"
            placeholder="Search..."
          />
        </InputGroup>
        <Stack overflowY={'scroll'} h={'full'}>
          <Box p={4} rounded={'2xl'} bg={'gray.100'}>
            <TwitterTweetEmbed tweetId="1536220887183200257" />
            <TwitterTweetEmbed tweetId="1550658458843639808" />
            <TwitterTweetEmbed tweetId="1548608447469432832" />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}
