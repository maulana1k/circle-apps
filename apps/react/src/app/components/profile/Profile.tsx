import {
  Stack,
  IconButton,
  Heading,
  Box,
  Avatar,
  Text,
  Button,
  ButtonGroup,
  Tabs,
  TabList,
  Tab,
  Image,
  HStack,
  Spinner,
  Container,
  TabPanels,
  TabPanel,
  Divider,
} from '@chakra-ui/react';
import {
  IRelationJoin,
  ITweet,
  UserWithToken,
} from '@circle-app/api-interfaces';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';
import { IoBalloon } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { UserContext, UserContextType } from '../../context/user.context';
import TweetsCard from '../atoms/TweetsCard';
import ProfileLayout from './ProfileLayout';

export default function Profile() {
  /**
   * User context data
   */
  const { user } = useContext(UserContext) as UserContextType;

  /**
   * Component state
   */
  const location = useLocation();
  const isCurrentProfile = location.pathname === '/' + user.username;

  const [profileData, setProfileData] = useState<UserWithToken | null>(
    isCurrentProfile ? user : null
  );
  const [userRelation, setUserRealtion] = useState<IRelationJoin | null>(null);
  const [tweets, setTweets] = useState<ITweet[]>();

  const [isFollowing, setIsFollowing] = useState(false);

  const getUserData = async () => {
    const userData = await axios.get<UserWithToken>(
      '/api/users' + location.pathname,
      { headers: { authorization: 'Bearer ' + user.token } }
    );
    setProfileData(userData.data);
  };
  const getUserRelations = async () => {
    const relations = await axios.get<IRelationJoin>(
      '/api/users/' + location.pathname + '/relations',
      { headers: { authorization: 'Bearer ' + user.token } }
    );
    setUserRealtion(relations.data);
    if (!!relations.data.followers.filter((u) => u._id === user._id).length) {
      setIsFollowing(true);
    }
  };
  const getUserTweets = async () => {
    const tweets = await axios.get('/api/tweet/users/' + profileData?._id, {
      headers: { authorization: 'Bearer ' + user.token },
    });

    setTweets(tweets.data);
  };
  useEffect(() => {
    (async () => {
      try {
        const userData = await axios.get<UserWithToken>(
          '/api/users' + location.pathname,
          { headers: { authorization: 'Bearer ' + user.token } }
        );
        const relations = await axios.get<IRelationJoin>(
          '/api/users/' + location.pathname + '/relations',
          { headers: { authorization: 'Bearer ' + user.token } }
        );
        const tweets = await axios.get(
          '/api/tweet/users/' + userData.data._id,
          {
            headers: { authorization: 'Bearer ' + user.token },
          }
        );

        setProfileData(userData.data);
        setUserRealtion(relations.data);
        if (
          !!relations.data.followers.filter((u) => u._id === user._id).length
        ) {
          setIsFollowing(true);
        }
        setTweets(tweets.data);
        // getUserData()
        //   .then(() => getUserRelations())
        //   .then(() => getUserTweets());
        console.log(userData.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [location.pathname]);

  const followHandle = async () => {
    const action = isFollowing ? '/unfollow' : '/follows';
    await axios
      .post(
        '/api/users/' + profileData?.username + action,
        { userId: user._id, followerUsername: user.username },
        {
          headers: { authorization: 'Bearer ' + user.token },
        }
      )
      .then(() => setIsFollowing(!isFollowing))
      .catch((err) => console.log(err));
    await getUserRelations();
  };

  if (!(profileData && userRelation)) {
    return (
      <Stack
        h={'100vh'}
        justify={'center'}
        align={'center'}
        spacing={6}
        pt={14}
      >
        <Spinner size={'xl'} />
      </Stack>
    );
  }
  return (
    <Stack spacing={6} pt={14}>
      <Stack spacing={-16}>
        {!!user.coverImages ? (
          <Box h={40} w={'full'} bg={'twitter.500'}></Box>
        ) : (
          <Image src={profileData.coverImages} />
        )}
        <Box px={6}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'end'}
          >
            <Avatar
              className="outline outline-4 outline-white"
              size={'2xl'}
              src={profileData.avatar}
            />
            <ButtonGroup>
              {user.username !== profileData.username ? (
                <>
                  <IconButton
                    aria-label="message"
                    children={<FiMail size={20} />}
                    variant={'outline'}
                    rounded={'full'}
                  />
                  {isFollowing ? (
                    <Button
                      onClick={followHandle}
                      variant={'outline'}
                      rounded={'full'}
                      // colorScheme={'twitter'}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={followHandle}
                      rounded={'full'}
                      colorScheme={'twitter'}
                    >
                      Follow
                    </Button>
                  )}
                </>
              ) : (
                <Button rounded={'full'} variant={'outline'}>
                  Edit Profile
                </Button>
              )}
            </ButtonGroup>
          </Stack>
        </Box>
      </Stack>
      <Stack px={6}>
        <Stack spacing={0}>
          <Heading size={'md'}>{profileData.displayName}</Heading>
          <Text color={'gray.500'}>@{profileData.username}</Text>
        </Stack>

        <Text>{profileData.bio}</Text>
        <HStack color={'gray.500'}>
          <IoBalloon />
          <Text>
            {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(
              new Date(profileData.birth)
            )}
          </Text>
        </HStack>
        <Stack spacing={6} direction={'row'}>
          <Button fontWeight={'normal'} size={'sm'} variant={'link'}>
            <Link
              to={'/' + profileData.username + '/follower'}
              state={userRelation}
            >
              <b>{userRelation.followers.length}</b> Followers
            </Link>
          </Button>
          <Button fontWeight={'normal'} size={'sm'} variant={'link'}>
            <Link
              to={'/' + profileData.username + '/following'}
              state={userRelation}
            >
              <b>{userRelation.followings.length}</b> Following
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
        <TabPanels>
          <TabPanel>
            <Stack divider={<Divider />} spacing={0} w={'full'}>
              {tweets && tweets.map((tweet) => <TweetsCard tweet={tweet} />)}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
