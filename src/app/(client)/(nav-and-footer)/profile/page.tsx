import React from 'react';
import { handleLogout } from '@/components/layout/LogoutButton';

const HomeSection = () => {
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl">Profile ini</h1>
        <button onClick={handleLogout} className='bg-red-500 px-3 py-2 rounded-md hover:cursor-pointer hover:bg-red-600 text-white'>Logout</button>
      </section>
    </>
  );
};

export default HomeSection;
