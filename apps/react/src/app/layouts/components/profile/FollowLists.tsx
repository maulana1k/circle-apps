import { Stack, Tab, TabList, Tabs } from '@chakra-ui/react';

export default function FollowLists() {
  return (
    <Stack pt={14}>
      <Tabs defaultIndex={0} isFitted>
        <TabList px={12}>
          <Tab>Follower</Tab>
          <Tab>Following</Tab>
        </TabList>
      </Tabs>
    </Stack>
  );
}
