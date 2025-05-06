import ProductDetailPage from '@/components/pages/ProductDetailPage';
import { ProductType } from '@/types/types';
import { notFound } from 'next/navigation';
import React from 'react';

const ProductById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const getProductById = await fetch(`http:localhost:3000/api/products/${id}`);
  const result = await getProductById.json();
  const data: ProductType = result as ProductType;
  if (!getProductById.ok) {
    notFound();
  }
  return (
    <>
      <ProductDetailPage product={data} />
    </>
  );
};

export default ProductById;
