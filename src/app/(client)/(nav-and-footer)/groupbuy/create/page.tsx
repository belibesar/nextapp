import CreateGroupBuyPage from '@/components/pages/Admin/CreateGroupBuyPage';
import { getLoggedInUserFromRequest } from '@/lib/getLoggedInUserFromRequest';
import { redirect } from 'next/navigation';
import React from 'react';

const AddGroupBuy = async () => {
  const getProducts = await fetch('http://localhost:3000/api/products/all');
  const productsData = await getProducts.json();

  const user = await getLoggedInUserFromRequest();
  if (!user || user instanceof Response) redirect('/login');
  if (user.role !== 'admin') redirect('/groupbuy');

  return (
    <>
      <CreateGroupBuyPage products={productsData} />
    </>
  );
};

export default AddGroupBuy;
