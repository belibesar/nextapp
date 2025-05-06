import React from 'react';
import DetailGroupBuy from '@/components/pages/Admin/DetailGroupBuyPage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';

const GroupBuyId = async() => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }
  const plainUser = {
    ...user,
    _id: user._id.toString(),
    createdAt: user.createdAt ? new Date(user.createdAt) : undefined,
    updatedAt: user.updatedAt ? new Date(user.updatedAt) : undefined,
  };
  return (
    <DetailGroupBuy user={plainUser}/>
  )
};

export default GroupBuyId;
