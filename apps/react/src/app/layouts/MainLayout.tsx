import { Container } from '@chakra-ui/react';
import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Search from '../components/Search';
import SideNavigation from '../components/SideNavigation';
import { UserContext, UserContextType } from '../context/user.context';

export default function MainLayout(props: { children?: ReactNode }) {
  const { user } = useContext(UserContext) as UserContextType;
  if (!user) {
    return <Navigate to={'/signin'} replace />;
  }
  return (
    <div style={{ background: '282B30' }} className=" h-screen w-full flex">
      <Container px={0} display={'flex'} maxW={'container.2xl'}>
        <SideNavigation />
        <div className="relative border-r w-1/2">
          <Outlet />
        </div>
        <Search />
      </Container>
    </div>
  );
}
