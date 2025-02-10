import { type FC } from 'react';
import { Navbar } from "../blocks/Navbar"
import Background from "../blocks/Background"
import { Outlet } from 'react-router-dom';

export const AuthLayout: FC = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Background />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;