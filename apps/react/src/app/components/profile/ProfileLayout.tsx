import { Box, Heading, IconButton, Stack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { Outlet, useLocation } from 'react-router-dom';

export default function ProfileLayout() {
  const location = useLocation();
  const header = location.pathname.replace(/\//gi, ' ');
  return (
    <Stack>
      <Box
        className="backdrop-blur-lg z-20"
        bg={'whiteAlpha.800'}
        w={'full'}
        px={4}
        position={'absolute'}
      >
        <Stack alignItems={'center'} direction={'row'} spacing={3}>
          <IconButton
            onClick={() => window.history.back()}
            variant={'ghost'}
            aria-label="back"
            rounded={'full'}
            icon={<FiArrowLeft size={24} />}
          />
          <Heading p={4} size={'md'}>
            {header}
          </Heading>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
}
