"use client"

import Image from "next/image"
import type { GroupBuy } from "@/types/types"
import Link from "next/link"
import { Calendar, MapPin, Package } from "lucide-react"
import { useState } from "react"

export default function GroupBuyCard({ groupBuy }: { groupBuy: GroupBuy }) {
  const [isHovered, setIsHovered] = useState(false)

  const price = groupBuy.productDetails
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      })
        .format(groupBuy.productDetails.price)
        .split(",")[0]
    : 0

  // Calculate days remaining
  const daysRemaining = () => {
    const deadline = new Date(groupBuy.deadline)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const days = daysRemaining()

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/groupbuy/${groupBuy._id}`} className="block h-full">
        <div className="relative h-40 bg-gray-200 overflow-hidden">
          <Image
            src={groupBuy?.productDetails?.img || "https://placehold.co/400x400"}
            alt={groupBuy.productDetails ? groupBuy.productDetails.name : ""}
            height={400}
            width={400}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute top-2 right-2 bg-[#0099cc] text-white text-xs font-bold px-2 py-1 rounded-full">
            {days} days left
          </div>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800" title={groupBuy.productDetails?.name}>
              {groupBuy.productDetails &&
                (groupBuy.productDetails.name.length > 15
                  ? `${groupBuy.productDetails.name.slice(0, 15)}...`
                  : groupBuy.productDetails.name)}
            </h3>
            <div className="text-base font-bold text-[#0099cc]">{price}</div>
          </div>

          <div className="space-y-1 mb-2">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-3 w-3 mr-1 text-[#0099cc]" />
              <p className="text-xs">
              <span className="font-bold ">Deadline:</span> {`${new Date(groupBuy.deadline).toDateString()}`}
              </p>
            </div>

            <div className="flex items-center text-gray-600">
              <Package className="h-3 w-3 mr-1 text-[#0099cc]" />
              <p className="text-xs">MOQ: {`${groupBuy.minTargetQuantity} paket`}</p>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="h-3 w-3 mr-1 text-[#0099cc]" />
              <p className="text-xs truncate" title={groupBuy.distributionLocation}>
                {groupBuy.distributionLocation}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs font-semibold">Min {groupBuy.minUserOrder} paket</p>
              {groupBuy.productDetails && groupBuy.productDetails.stock !== 0 ? (
                <p className="text-xs text-green-600">{groupBuy.productDetails.stock} paket available</p>
              ) : (
                <p className="text-xs text-red-500">Out of stock</p>
              )}
            </div>

            <button className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors">
              Join
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
