import { Box, Heading, IconButton, Stack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  return (
    <div>
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
            Display Name
          </Heading>
        </Stack>
      </Box>
      <Outlet />
    </div>
  );
}
