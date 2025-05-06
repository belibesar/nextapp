import CreateGroupBuyPage from '@/components/pages/Admin/CreateGroupBuyPage';
import React from 'react';

const AddGroupBuy = async () => {
  const getProducts = await fetch('http://localhost:3000/api/products/all');
  const productsData = await getProducts.json();
  return (
    <>
      <CreateGroupBuyPage products={productsData} />
    </>
  );
};

export default AddGroupBuy;
