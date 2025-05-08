"use client"

import { useState, useEffect } from "react"
import GroupBuyAdmin from "@/components/fragments/GroupBuyAdmin"
import { type GroupBuy, GroupBuyStatus } from "@/types/types"
import Link from "next/link"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function GroupBuyPage() {
  const [groupBuys, setGroupBuys] = useState<GroupBuy[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<GroupBuyStatus | "ALL">("ALL")

  useEffect(() => {
    fetchGroupBuys()
  }, [])

  const fetchGroupBuys = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/group-buys")
      const data = await response.json()
      setGroupBuys(data)
    } catch (error) {
      console.error("Error fetching group buys:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = (groupBuyId: string, newStatus: GroupBuyStatus) => {
    // Update the local state to reflect the change
    setGroupBuys((prevGroupBuys) =>
      prevGroupBuys.map((gb) => (String(gb._id) === groupBuyId ? { ...gb, status: newStatus } : gb)),
    )
  }

  const filteredGroupBuys = activeFilter === "ALL" ? groupBuys : groupBuys.filter((gb) => gb.status === activeFilter)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6 items-center">
          <h1 className="text-2xl font-bold text-gray-800">Group Buy</h1>
          <Link
            href={"/groupbuy/create"}
            className="btn btn-sm bg-[#0099cc] hover:bg-[#0088bb] text-white border-none rounded-md px-6"
          >
            Create
          </Link>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === "ALL" ? "bg-[#0099cc] text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.OPEN)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.OPEN
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            Open
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.WAITING_FULL_PAYMENT)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.WAITING_FULL_PAYMENT
                ? "bg-yellow-600 text-white"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }`}
          >
            Waiting Payment
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.SHIPPED)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.SHIPPED
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Shipped
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.PROCESSING)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.PROCESSING
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Processing
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.DONE)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.DONE
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 hover:bg-purple-200"
            }`}
          >
            Done
          </button>
          <button
            onClick={() => setActiveFilter(GroupBuyStatus.FAILED)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              activeFilter === GroupBuyStatus.FAILED
                ? "bg-red-600 text-white"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
          >
            Failed
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0099cc]"></div>
          </div>
        ) : (
          <>
            {/* Empty State */}
            {filteredGroupBuys.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No group buys found for this filter</p>
                <button
                  onClick={() => setActiveFilter("ALL")}
                  className="mt-4 px-4 py-2 bg-[#0099cc] text-white rounded-md hover:bg-[#0088bb]"
                >
                  Show All Group Buys
                </button>
              </div>
            )}

            {/* Product Group Buy */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGroupBuys.map((groupBuy: GroupBuy) => (
                <GroupBuyAdmin key={String(groupBuy._id)} groupBuy={groupBuy} onStatusChange={handleStatusChange} />
              ))}
            </div>
          </>
        )}

        {/* More Button - Only show if there are items */}
        {filteredGroupBuys.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="btn bg-[#0099cc] hover:bg-[#0088bb] text-white border-none px-8 rounded-md">
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="mt-16"
      />
    </div>
  )
}
