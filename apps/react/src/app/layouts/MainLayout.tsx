import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Feeds from './components/Feeds';
import Search from './components/Search';
import SideNavigation from './components/SideNavigation';
import Tweets from './components/Tweets';

export default function MainLayout(props: { children?: ReactNode }) {
  return (
    <div style={{ background: '282B30' }} className=" h-screen w-full flex">
      <Container px={10} display={'flex'} maxW={'container.2xl'}>
        <SideNavigation />
        <div className="relative border-r w-1/2">
          <Outlet />
        </div>
        <Search />
      </Container>
    </div>
  );
}
