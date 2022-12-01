import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { IRelationJoin, IUser } from '@circle-app/api-interfaces';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserList from '../atoms/UserList';

export default function FollowLists() {
  // const { user } = useContext(UserContext) as UserContextType;
  const location = useLocation();
  const [userRelations, setUserRelations] = useState<IRelationJoin>(
    location.state as IRelationJoin
  );

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.get<IRelationJoin>(
  //         '/api/users/' + location.state + '/relations',
  //         { headers: { authorization: 'Bearer ' + user.token } }
  //       );
  //       setUserRelations(res.data);
  //     } catch (error) {}
  //   })();
  // }, []);
  return (
    <Stack pt={14}>
      <Tabs defaultIndex={0} isFitted>
        <TabList px={12}>
          <Tab>Follower</Tab>
          <Tab>Following</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              {userRelations?.followers.map((user: IUser) => (
                <UserList user={user} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack spacing={4}>
              {userRelations?.followings.map((user: IUser) => (
                <UserList user={user} />
              ))}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
}
