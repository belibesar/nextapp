'use client';

import Image from 'next/image';
import { ProductType } from '@/types/types';
import Link from 'next/link';

export default function ProductCard({ product }: { product: ProductType }) {
  const bundlePrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price * 10); // edit 10, 10 for bundle buy

  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price).replace('Rp', '@')

  return (
    <Link href={`/products/${product._id}`} >
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 transform">
        <div className="h-48 bg-gray-200">
          <Image
           src="https://placehold.co/400x400"
            alt={product.name}
            height={400}
            width={400}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className='flex flex-row justify-between'>
          <h3 className="font-bold">{
            product.name.length > 15 ? `${product.name.slice(0, 15)}...` : product.name
          }</h3>
            <h3 className="font-bold">{bundlePrice}</h3>
          </div>

          <div className='flex flex-row justify-between'>
            <h3 className="font-bold">{
              product.producer.name.length > 15 ? `${product.producer.name.slice(0, 15)}...` : product.producer.name
            }</h3>
            <h3 className='font-bold'>{price}</h3>
          </div>

          <div className='flex flex-row justify-between items-start mt-5'>
            <p className="text-sm text-black font-semibold">{product.category}</p>
            <div className='flex flex-col'>
              <p className='text-sm font-semibold text-right'>Min 1 paket</p> {/*change this to bundle qty */}
              {product.stock !== 0 ? (
                <p className='text-sm text-blue-500'>{product.stock} paket available</p>
              ) : (
                <p className='text-sm text-red-500'>Out of stock</p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <button className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors">Add to Cart</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
