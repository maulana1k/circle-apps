import { Box, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import HeroImg from '../../../assets/img/peeps.png';

export default function AuthLayout(props: { children: ReactNode }) {
  return (
    <div className=" flex layout bg-gray-50" >
      <div
        style={{
          backgroundImage: `url('${HeroImg}')`,
          backgroundSize: '100vh',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
        }}
        className="hidden md:block h-full w-full py-10 "
      >
        <Box m={16}>
          <Heading size={'4xl'} fontWeight={'bold'}>
            Join the
            <Text
              className={
                'font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 poppins'
              }
            >
              {' '}
              <b>Unsoedfess</b>
            </Text>
          </Heading>
        </Box>
      </div>
      <div className=" flex flex-col shadow-lg bg-white justify-center items-center md:w-3/4 w-full h-full">
        {props.children}
      </div>
    </div>
  );
}
