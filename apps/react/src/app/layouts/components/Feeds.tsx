import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { FiClock, FiFile, FiImage, FiLink, FiVideo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AttachButton from './atoms/CustomButton';
import TweetsCard from './atoms/TweetsCard';

export const ImageAttachment = (props: { src: string }) => {
  return <Image rounded={'2xl'} src={props.src} />;
};

export const FileAttchment = (props: { src: string }) => {
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

export const TweetField = () => {
  const auto_grow = (e: any) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 4}px`;
  };
  return (
    <Stack className="px-4" w="full" display={'flex'} spacing={3}>
      <Stack direction={'row'}>
        <Avatar src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" />
        <Stack alignItems={'start'} pb={2} spacing={1} w={'full'}>
          <Textarea
            onInput={(e: any) => auto_grow(e)}
            border={'none'}
            w={'full'}
            resize="none"
            rows={2}
            wrap="hard"
            focusBorderColor="none"
            placeholder="What do you think?"
            className="placeholder:text-xl  placeholder:text-gray-500 "
          />
          {/* <Image
            rounded={'2xl'}
            src="https://cdn.dribbble.com/users/1171505/screenshots/15253256/media/9195348e7da3886e8269918b952f0466.png"
          /> */}
          {/* <ImageAttachment src="https://cdn.dribbble.com/users/1171505/screenshots/15253256/media/9195348e7da3886e8269918b952f0466.png" /> */}

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
              <AttachButton icon={<FiVideo />} />
            </Stack>
            <Button size={'sm'} colorScheme={'twitter'} rounded="full">
              Tweet
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default function Feeds() {
  return (
    <>
      <Box
        className="backdrop-blur-lg z-40"
        bg={'whiteAlpha.800'}
        w={'full'}
        position={'absolute'}
      >
        <Heading p={4} size={'md'}>
          Feeds
        </Heading>
      </Box>
      <Stack spacing={0} pt={14} overflowY={'scroll'} h={'full'} w={'full'}>
        <TweetField />
        <Divider />
        <Stack alignItems={'center'} spacing={0}>
          {[1, 2, 3, 4, 5].map((i) => (
            <>
              <TweetsCard />
              <Divider />
            </>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
