import UserOrderPage from '@/components/pages/User/UserOrderPage';
import AdminOrderPage from '@/components/pages/Admin/AdminOrderPage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';
import React from 'react';

const Orders = async () => {
  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) {
    throw new Error('User not found or invalid user type');
  }
  return <div>{user.role === 'admin' ? <AdminOrderPage /> : <UserOrderPage />}</div>;
};

export default Orders;
