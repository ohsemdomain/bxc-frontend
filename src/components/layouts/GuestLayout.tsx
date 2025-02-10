import { type FC } from 'react';
import Background from "../blocks/Background"
import { Outlet } from 'react-router-dom';

export const GuestLayout: FC = () => {
  return (
    <div className="w-full h-full min-h-screen">
      <Background />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;