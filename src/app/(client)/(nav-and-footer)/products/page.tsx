import React from 'react';

const Products = () => {
  return (
    <section className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Product Card 1 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Indomie Goreng</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Indofood CBP</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Mie Sedaap Goreng</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Wings Food</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Pepsodent</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Unilever</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 4 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Pepsodent</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Unilever</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 5 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Indomie Goreng</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Indofood CBP</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 6 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Mie Sedaap Goreng</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Wings Food</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 7 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Pepsodent</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Unilever</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Card 8 */}
        <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden">
          <figure className="bg-[#e2e2e2] h-48"></figure>
          <div className="card-body p-4">
            <h2 className="card-title text-lg font-bold">Pepsodent</h2>
            <p className="text-sm text-gray-600">1 Paket - 500 karton</p>
            <p className="font-bold">Unilever</p>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">Rp. 60.000.000</span>
              <button className="btn btn-sm bg-[#e5e7eb] hover:bg-[#d1d5db] text-[#374151] border-none rounded-md">Already in Cart</button>
            </div>
          </div>
        </div>
      </div>

      {/* More Button */}
      <div className="flex justify-end mt-8">
        <button className="btn bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">More</button>
      </div>
    </section>
  );
};

export default Products;
