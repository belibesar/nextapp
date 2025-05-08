import ProductCard from "@/components/fragments/ProductCard"
import type { GroupBuy, ProductType } from "@/types/types"
import type { UserType } from "@/types/types"
import Link from "next/link"
import GroupBuyCard from "@/components/fragments/GroupBuyCard"
import { ShoppingCart, Package, Clock, XCircle } from "lucide-react"

const DashboardPage = async ({ user }: { user: UserType }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/products`)
  const data = await res.json()

  const result = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/group-buys`)
  const groups = await result.json()

  const plainUser = {
    ...user,
    _id: user._id?.toString(), // Convert _id to string
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content - Reduced top padding */}
      <main className="flex-1 container mx-auto px-4 py-4">
        {/* Dashboard Cards - More compact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* User Info Card - More compact */}
          <div className="md:col-span-3 bg-gradient-to-r from-[#0099cc] to-[#00b3cc] text-white rounded-xl p-4 shadow-md">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold">{plainUser.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-lg">Halo, </span>
                    <span className="text-lg font-bold capitalize ml-1">{plainUser.name}</span>
                  </div>
                  <div className="text-sm text-white/80">{plainUser.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-lg font-bold capitalize">{plainUser.role}</div>
                  <div className="text-sm text-white/80 capitalize">{plainUser.companyName}</div>
                </div>

                <div className="text-right border-l border-white/20 pl-6">
                  <div className="text-lg font-bold">{plainUser.contact.address.regency}</div>
                  <div className="text-sm text-white/80">{plainUser.contact.address.province}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Cards - More compact */}
          <div className="space-y-4">
            {/* Cart Summary */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#0099cc]/10 flex items-center justify-center mr-3">
                  <ShoppingCart className="h-5 w-5 text-[#0099cc]" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">Cart</h2>
              </div>
              <div className="text-2xl font-bold text-[#0099cc]">3</div>
            </div>

            {/* Orders Summary */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
              <h2 className="text-lg font-bold mb-2 text-gray-800">Orders</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-1.5 rounded-lg bg-green-50">
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">Active</span>
                  </div>
                  <span className="text-lg font-bold text-green-500">2</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded-lg bg-yellow-50">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-700">Pending</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-500">1</span>
                </div>
                <div className="flex justify-between items-center p-1.5 rounded-lg bg-red-50">
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-sm text-gray-700">Rejected</span>
                  </div>
                  <span className="text-lg font-bold text-red-500">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map((product: ProductType) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href={"/products"}
              className="bg-[#0099cc] text-white px-6 py-2 rounded-md hover:bg-[#007aa3] transition-colors flex items-center"
            >
              More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Group Buy Section */}
        <div className="mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Group Buy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {groups.map((groupBuy: GroupBuy, index: string) => (
              <GroupBuyCard key={index} groupBuy={groupBuy} />
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href={"/groupbuy"}
              className="bg-[#0099cc] text-white px-6 py-2 rounded-md hover:bg-[#007aa3] transition-colors flex items-center"
            >
              More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>

    </div>
  )
}

export default DashboardPage
