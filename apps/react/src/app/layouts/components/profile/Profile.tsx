import {
  Stack,
  IconButton,
  Heading,
  Box,
  Image,
  Avatar,
  Text,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import { FiArrowLeft, FiMail, FiMoreHorizontal } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <Stack spacing={6} pt={14}>
      <Stack spacing={-16}>
        <Image src="https://pbs.twimg.com/profile_banners/1283708345807826954/1600957009/1500x500" />
        <Box px={6}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <Avatar
              className="outline outline-4 outline-white"
              size={'2xl'}
              src="https://pbs.twimg.com/profile_images/1309134700070477826/Au8AaehA_400x400.jpg"
            />
            <ButtonGroup>
              <IconButton
                aria-label="more"
                children={<FiMoreHorizontal size={20} />}
                variant={'outline'}
                rounded={'full'}
              />
              <IconButton
                aria-label="message"
                children={<FiMail size={20} />}
                variant={'outline'}
                rounded={'full'}
              />
              <Button rounded={'full'} colorScheme={'twitter'}>
                Follow
              </Button>
            </ButtonGroup>
          </Stack>
        </Box>
      </Stack>
      <Stack px={6}>
        <Stack spacing={0}>
          <Heading size={'md'}>Display name</Heading>
          <Text color={'gray.500'}>@username</Text>
        </Stack>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt,
          assumenda labore.
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button fontWeight={'normal'} size={'sm'} variant={'link'}>
            <Link to={'/username/follower'}>
              <b>1,241</b> Followers
            </Link>
          </Button>
          <Button fontWeight={'normal'} size={'sm'} variant={'link'}>
            <Link to={'/username/following'}>
              <b>684</b> Following
            </Link>
          </Button>
        </Stack>
      </Stack>

      <Tabs isFitted>
        <TabList px={6}>
          <Tab>Tweets</Tab>
          <Tab>Mention</Tab>
          <Tab>Likes</Tab>
        </TabList>
      </Tabs>
    </Stack>
  );
}
