import AdminGroupBuyPage from '@/components/pages/Admin/AdminGroupBuyPage';
import UserGroupBuyPage from '@/components/pages/User/UserGroupBuyPage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';
import { redirect } from 'next/navigation';
import React from 'react';

const GroupBuy = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) redirect('/login');
  return <>{user.role === 'admin' ? <AdminGroupBuyPage /> : <UserGroupBuyPage />}</>;
};

export default GroupBuy;
