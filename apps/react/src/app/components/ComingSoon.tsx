import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { VscDebugConsole } from 'react-icons/vsc';

export default function ComingSoon() {
  return (
    <Flex
      height={'full'}
      w={'full'}
      bg={'gray.100'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Stack
        w={'md'}
        bg={'white'}
        color={'gray.500'}
        textAlign={'center'}
        p={12}
        shadow={'md'}
        spacing={6}
        rounded={'3xl'}
      >
        <Center>
          <VscDebugConsole size={90} />
        </Center>
        <Heading fontWeight={'semibold'} size={'lg'}>
          This feature is still under development
        </Heading>
        <Text>Feel free to contact me for your feedback :)</Text>
      </Stack>
    </Flex>
  );
}
