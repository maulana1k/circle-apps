import {
  Avatar,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { IconType } from 'react-icons';
import {
  FiBell,
  FiBookmark,
  FiCompass,
  FiHome,
  FiLogOut,
  FiMail,
  FiUser,
} from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../context/user.context';
import TweetModal from './atoms/TweetModal';

const MenuNavButton = (props: {
  children: string;
  icon: IconType;
  isActive?: boolean;
}) => {
  return (
    <Button
      borderRadius={'full'}
      variant="ghost"
      size={'lg'}
      leftIcon={<props.icon size={26} />}
      iconSpacing={6}
    >
      <Text fontWeight={props.isActive ? 800 : 400} fontSize={'xl'}>
        {props.children}
      </Text>
    </Button>
  );
};

export default function SideNavigation() {
  const { user } = useContext(UserContext) as UserContextType;
  /**
   * Menu icon and object mapping
   */
  const menuIconMap = {
    Home: { icon: FiHome, path: '' },
    Explore: { icon: FiCompass, path: 'explore' },
    Notifications: { icon: FiBell, path: 'notifications' },
    Messages: { icon: FiMail, path: 'messages' },
    Saved: { icon: FiBookmark, path: 'saved' },
    Profile: { icon: FiUser, path: user.username },
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen: isOpenLogout, onClose: onCLoseLogout, onOpen: onOpenLogout } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user-data');
    return navigate('/signin');
  };
  return (
    <div className="p-4 flex h-full w-1/4 border-r">
      <Stack w={'full'} px={6} justifyContent="space-between">
        <Stack spacing={6}>
          <Heading
            className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 poppins"
            style={{ fontFamily: `'Poppins',sans-serif` }}
            px={6}
          >
            Unsoedfess
          </Heading>
          <Stack spacing={3} alignItems={'start'}>
            {Object.entries(menuIconMap).map(([menu, { icon, path }]) => (
              <Link key={menu} to={path}>
                <MenuNavButton
                  isActive={location.pathname === '/' + path}
                  icon={icon}
                >
                  {menu}
                </MenuNavButton>
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

          <Menu>
            <MenuButton>
              <Stack spacing={4} alignItems={'center'} direction={'row'}>
                <Avatar size={'md'} src={user.avatar} />
                <Stack align={'start'} spacing={0}>
                  <Text fontSize={'sm'} fontWeight={600}>{user.displayName}</Text>
                  <Text fontSize={'sm'} color={'gray.500'} fontWeight={400}>
                    @{user.username}
                  </Text>
                </Stack>
              </Stack>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpenLogout}>
                <FiLogOut /> Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Stack>
      <Modal isCentered isOpen={isOpenLogout} onClose={onCLoseLogout}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={6} >
            <Stack spacing={6} >
              <Text fontSize={'xl'} >Are you sure to logout?</Text>
              <Button onClick={logout} rounded={'full'} colorScheme={'red'} >Logout</Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
