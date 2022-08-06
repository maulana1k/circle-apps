import {
  Avatar,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';
import {
  FiBell,
  FiBookmark,
  FiCompass,
  FiHome,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import TweetModal from './atoms/TweetModal';

const MenuButton = (props: { children: string; icon: IconType }) => {
  return (
    <Button
      borderRadius={'full'}
      variant="ghost"
      size={'lg'}
      leftIcon={<props.icon size={26} />}
      iconSpacing={6}
    >
      <Text fontWeight={400} fontSize={'lg'}>
        {props.children}
      </Text>
    </Button>
  );
};

export default function SideNavigation() {
  const menuIconMap = {
    Home: { icon: FiHome, path: '/' },
    Explore: { icon: FiCompass, path: '/explore' },
    Notifications: { icon: FiBell, path: '/notifications' },
    Messages: { icon: FiMail, path: '/messages' },
    Saved: { icon: FiBookmark, path: '/saved' },
    Profile: { icon: FiUser, path: '/username' },
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="p-4 flex h-full w-1/4 border-r">
      <Stack px={6} justifyContent="space-between">
        <Stack spacing={6}>
          <Heading style={{ fontFamily: `'Poppins',sans-serif` }} px={6}>
            Circle.
          </Heading>
          <Stack spacing={3} alignItems={'start'}>
            {Object.entries(menuIconMap).map(([menu, { icon, path }]) => (
              <Link to={path}>
                <MenuButton key={menu} icon={icon}>
                  {menu}
                </MenuButton>
              </Link>
            ))}
            <Button
              rounded={'full'}
              onClick={onOpen}
              size={'lg'}
              colorScheme={'twitter'}
              w={'full'}
            >
              Tweet
            </Button>
            <TweetModal isOpen={isOpen} onClose={onClose} />
          </Stack>
        </Stack>
        <Box
          py={3}
          px={6}
          borderRadius={'full'}
          _hover={{ background: 'gray.100' }}
        >
          <Stack spacing={4} alignItems={'center'} direction={'row'}>
            <Avatar size={'md'} />
            <Stack spacing={0}>
              <Text fontWeight={600}>Display name</Text>
              <Text color={'gray.500'} fontWeight={400}>
                @username
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
}
