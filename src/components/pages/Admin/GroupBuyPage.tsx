import Link from 'next/link';
import React from 'react';

const GroupBuyPage = () => {
  // Sample product data
  const products = Array(10).fill({
    name: 'Product Name',
    deadline: '2024-08-22',
    moq: 10,
    price: 56000000,
    location: 'Jakarta',
    minOrder: 1,
    available: 50,
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button className="btn btn-sm bg-gray-200 hover:bg-gray-300 border-none text-gray-700 rounded-md px-6">Back</button>
          <Link
            href={'/groupbuy/create'}
            className="btn btn-sm bg-[#0099cc] hover:bg-[#0088bb] text-white border-none rounded-md px-6"
          >
            Create
          </Link>
        </div>

        {/* Section Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Group Buy</h1>

        {/* Product Group Buy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg rounded-lg overflow-hidden w-72"
            >
              {/* Product Image Placeholder */}
              <div className="bg-gray-300 h-48 w-full"></div>

              {/* Product Details */}
              <div className="p-4">
                <h2 className="font-bold text-lg">{product.name}</h2>

                <div className="text-sm">
                  <div className="flex items-baseline">
                    <span className="font-semibold">Deadline</span>
                    <span className="ml-1">{product.deadline}</span>
                  </div>
                  <div className="flex items-baseline">
                    <span className="font-semibold">MOQ:</span>
                    <span className="ml-1">{product.moq} Paket</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mt-2">
                  <div className="mt-2 text-sm">{product.location}</div>
                  <div className="right flex flex-col items-end">
                    <span className="font-bold">Rp. {product.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-600">per paket</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-start mt-1">
                  <span className="text-xs">Minimal {product.minOrder} Paket</span>
                  <span className="text-xs text-[#008DCB]">{product.available} Paket Available</span>
                </div>

                {/* Join Button */}
                <button className="btn btn-sm bg-[#008DCB] hover:bg-[#0088bb] text-white border-none w-full mt-3 rounded-md">Join</button>
              </div>
            </div>
          ))}
        </div>

        {/* More Button */}
        <div className="flex justify-center mt-8">
          <button className="btn bg-[#0099cc] hover:bg-[#0088bb] text-white border-none px-8 rounded-md">More</button>
        </div>
      </main>
    </div>
  );
};

export default GroupBuyPage;
