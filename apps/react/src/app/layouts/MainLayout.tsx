import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../components/Search';
import SideNavigation from '../components/SideNavigation';

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
