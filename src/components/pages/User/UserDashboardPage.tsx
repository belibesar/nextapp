import React from 'react';

import ProductCard from '@/components/fragments/ProductCard';
import { UserType } from '@/types/types';

const DashboardPage = ({ user }: { user: UserType }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* User Info Card */}
            <div className="md:col-span-3 bg-[#0099cc] text-white rounded-lg p-8 flex flex-col md:flex-row justify-between">
              <div className="space-y-1">
                <div>
                  <span className="text-xl">Halo, </span>
                  <span className="text-xl font-bold">{user.name}</span>
                </div>
                <div className="text-sm">{user.email}</div>
                <div className="mt-16 text-xl font-bold">{user.companyName}</div>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-xl font-bold">{user.role}</div>
                <div className="mt-16 text-xl font-bold">{user.contact.address.regency}</div>
                <div>{user.contact.address.province}</div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              {/* Cart Summary */}
              <div className="bg-[#0099cc] text-white rounded-lg p-6 text-center">
                <h2 className="text-xl font-bold mb-2">Cart</h2>
                <div className="text-2xl font-bold">
                  3 <span className="text-lg font-normal">Items</span>
                </div>
              </div>

              {/* Orders Summary */}
              <div className="bg-[#0099cc] text-white rounded-lg p-6">
                <h2 className="text-xl font-bold mb-2 text-center">Orders</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">2</span>
                    <span>Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">1</span>
                    <span>Pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">1</span>
                    <span>Rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Featured Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product 1 */}
              <ProductCard
                name="Indomie Goreng"
                details="1 Paket - 500 karton"
                brand="Indofood CBP"
                price="Rp. 60.000.000"
              />

              {/* Product 2 */}
              <ProductCard
                name="Mie Sedaap Goreng"
                details="1 Paket - 500 karton"
                brand="Wings Food"
                price="Rp. 60.000.000"
              />

              {/* Product 3 */}
              <ProductCard
                name="Pepsodent"
                details="1 Paket - 500 karton"
                brand="Unilever"
                price="Rp. 60.000.000"
              />

              {/* Product 4 */}
              <ProductCard
                name="Pepsodent"
                details="1 Paket - 500 karton"
                brand="Unilever"
                price="Rp. 60.000.000"
              />
            </div>

            <div className="flex justify-center mt-8">
              <button className="bg-[#0099cc] text-white px-8 py-2 rounded-md hover:bg-[#007aa3] transition-colors">More</button>
            </div>
          </div>
        </main>

        {/* Footer */}
      </div>
    </>
  );
};

export default DashboardPage;
