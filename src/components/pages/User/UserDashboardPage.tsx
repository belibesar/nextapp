import React from "react";
import ProductCard from "@/components/fragments/ProductCard";
import { GroupBuy, ProductType } from "@/types/types";
import { UserType } from "@/types/types";
import Link from "next/link";
import GroupBuyCard from "@/components/fragments/GroupBuyCard";

const DashboardPage = async ({ user }: { user: UserType }) => {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  const result = await fetch("http://localhost:3000/api/group-buys");
  const groups = await result.json();

  const plainUser = {
    ...user,
    _id: user._id.toString(), // Convert _id to string
  };
  
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
                  <span className="text-xl font-bold capitalize">
                    {user.name}
                  </span>
                </div>
                <div className="text-sm">{user.email}</div>
                <div className="mt-16 text-xl font-bold capitalize">
                  {user.companyName}
                </div>
              </div>
              <div className="text-right mt-4 md:mt-0">
                <div className="text-xl font-bold capitalize">{user.role}</div>
                <div className="mt-16 text-xl font-bold">
                  {user.contact.address.regency}
                </div>
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
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* LOOP FEATURED PRODUCT HERE */}
              {data.map((product: ProductType) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  // name={product.name}
                  // category={product.category}
                  // producerName={product.producer.name}
                  // price={product.price}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href={"/products"}
                className="bg-[#0099cc] text-white px-8 py-2 rounded-md hover:bg-[#007aa3] transition-colors"
              >
                More
              </Link>
            </div>
          </div>


          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Group Buy
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {groups.map((product: GroupBuy, index: string) => (
                <GroupBuyCard
                  key={index}
                  product={product}
                  user={plainUser}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Link
                href={"/group-buys"}
                className="bg-[#0099cc] text-white px-8 py-2 rounded-md hover:bg-[#007aa3] transition-colors"
              >
                More
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
      </div>
    </>
  );
};

export default DashboardPage;
