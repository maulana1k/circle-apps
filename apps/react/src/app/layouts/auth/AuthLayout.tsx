import { ReactNode } from 'react';
import HeroImg from '../../../assets/img/hero-2.jpg';

export default function AuthLayout(props: { children: ReactNode }) {
  return (
    <div className=" flex layout">
      <div
        style={{
          backgroundImage: `url('${HeroImg}')`,
          backgroundSize: '120vh',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="hidden md:block h-full w-full "
      ></div>
      <div className=" flex flex-col justify-center items-center  md:w-3/4 w-full h-full">
        {props.children}
      </div>
    </div>
  );
}
