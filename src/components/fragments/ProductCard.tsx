'use client';

import Image from 'next/image';
import { ProductType } from '@/types/types';

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
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
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.category}</p>
        <p className="text-sm text-gray-600">{product.producer.name}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm">Rp. {product.price}</span>
          <button className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
