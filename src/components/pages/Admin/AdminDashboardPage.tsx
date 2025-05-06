import { UserType } from '@/types/types';
import React from 'react';

const AdminDashboardPage = async ({ user }: { user: UserType }) => {
  return (
    <>
      <section className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Info Card */}
          <div className="md:col-span-2 bg-[#1194D0] text-white rounded-lg p-8">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl">
                  Halo, <span className="font-bold capitalize">{user.name}</span>
                </h2>
                <p className="text-sm">{user.email}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold capitalize">{user.role}</h2>
              </div>
            </div>
            <div className="mt-16">
              <h2 className="text-2xl font-bold">BeliBesar</h2>
              <h3 className="text-xl">Head Office</h3>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#1194D0] text-white rounded-lg p-4">
              <h3 className="text-xl font-bold">Products</h3>
              <p className="text-2xl font-bold">
                232 <span className="font-normal">Items</span>
              </p>
            </div>
            <div className="bg-[#1194D0] text-white rounded-lg p-4">
              <h3 className="text-xl font-bold">Orders</h3>
              <div className="space-y-2 mt-2">
                <p className="text-xl font-bold">
                  27 <span className="font-normal">Active</span>
                </p>
                <p className="text-xl font-bold">
                  12 <span className="font-normal">Pending</span>
                </p>
                <p className="text-xl font-bold">
                  72 <span className="font-normal">On Delivery</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Producers Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Producers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`producer-${index}`}
                  className="bg-slate-200 rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">Indofood CBP</h3>
                    <span className="font-bold">24 Products</span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Phone: 021-57958822</p>
                    <p>Email: corporate@indofood.co.id</p>
                    <p>Address: Sudirman Plaza, Indofood Tower, Lantai 23,</p>
                    <p>Jl. Jend. Sudirman Kav. 76-78, Jakarta 12910.</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary text-white px-8">More</button>
          </div>
        </section>

        {/* Distributors Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">Distributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`distributor-${index}`}
                  className="bg-slate-200 rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">Toko Madura 1</h3>
                  </div>
                  <div className="mt-2 text-sm">
                    <p>Phone: 021-57958822</p>
                    <p>Email: maduraja@gmail.com</p>
                    <p>Address: Surabaya, Jawa Timur</p>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <button className="btn btn-primary text-white px-8">More</button>
          </div>
        </section>
      </section>
    </>
  );
};

export default AdminDashboardPage;
