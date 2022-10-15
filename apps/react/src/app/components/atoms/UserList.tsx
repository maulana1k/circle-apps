import { Avatar, Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { IUser } from '@circle-app/api-interfaces';
import { Link } from 'react-router-dom';

export default function UserList(props: { user: IUser; follow?: boolean }) {
  return (
    <Box>
      <Stack direction={'row'} justify={'space-between'}>
        <Link to={'/' + props.user.username}>
          <Stack spacing={4} direction={'row'}>
            <Avatar src={props.user.avatar} />
            <Stack spacing={0}>
              <Text
                _hover={{ textDecoration: 'underline' }}
                fontWeight={'bold'}
                size={'md'}
              >
                {props.user.displayName}
              </Text>
              <Text as={'a'}>@{props.user.username}</Text>
            </Stack>
          </Stack>
        </Link>
        {props.follow && (
          <Button rounded={'full'} bgColor={'blackAlpha.900'} color={'white'}>
            Follow
          </Button>
        )}
      </Stack>
    </Box>
  );
}
