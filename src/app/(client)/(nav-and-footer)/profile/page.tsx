import React from 'react';
import ProfilePage from '@/components/pages/User/ProfilePage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';

const HomeSection = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }

  const users = {
    ...user,
    _id: user._id.toString(),
  }
  return (
    <>
      <ProfilePage user={users} />
    </>
  );
};

export default HomeSection;
