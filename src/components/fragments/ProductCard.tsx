'use client';

import Image from 'next/image';

export default function ProductCard({ name, category, producerName, price }: { name: string; category: string; producerName: string; price: number }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-48 bg-gray-200">
        <Image
          src="https://placehold.co/400x400"
          alt={name}
          height={400}
          width={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-sm text-gray-600">{producerName}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm">Rp. {price}</span>
          <button className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
