import React from 'react';
import ProfilePage from '@/components/pages/ProfilePage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';

const HomeSection = async() => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }
  return (
    <>
      <ProfilePage user={user}/>
    </>
  );
};

export default HomeSection;
