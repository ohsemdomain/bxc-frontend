import { type FC } from 'react';
import { Backbar } from "../blocks/Backbar"
import Background from "../blocks/Background"
import { Outlet } from 'react-router-dom';

export const AuthLayoutFull: FC = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Background />
      <Backbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayoutFull;