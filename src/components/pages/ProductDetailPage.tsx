import React from 'react';
import Image from 'next/image';
import GoBackButton from '../layout/GoBackButton';
import { ProductType } from '@/types/types';
import Link from 'next/link';

const ProductDetailPage = ({ product }: { product: ProductType }) => {
  return (
    <>
      <section className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4">
          <GoBackButton />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-200 rounded-lg aspect-square md:aspect-auto md:h-96 overflow-hidden">
            <Image
              src="https://placehold.co/400x400"
              alt="Indomie Goreng"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-xl text-gray-700">{product.producer.name}</p>

            <p className="text-sm text-gray-600">Product ID: {String(product._id)}</p>

            <p className="text-base text-gray-700 mt-4">1 Paket - 500 karton</p>

            <p className="text-xl font-bold mt-2">
              Rp. {product.price}
              <span className="text-gray-600 font-normal">/paket</span>
            </p>

            <div className="pt-4">
              <Link
                href={'/groupbuy'}
                className="btn bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md px-6"
              >
                Buy
              </Link>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
