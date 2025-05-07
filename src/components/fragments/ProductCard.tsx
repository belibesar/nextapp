"use client"

import Image from "next/image"
import type { ProductType } from "@/types/types"
import Link from "next/link"
import { Tag, User, Package } from "lucide-react"
import { useState } from "react"

export default function ProductCard({ product }: { product: ProductType }) {
  const [isHovered, setIsHovered] = useState(false)

  const bundlePrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price * 10) // 10 for bundle buy

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(product.price)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 bg-gray-200 overflow-hidden">
        <Image
          src={product?.img || "https://placehold.co/400x400"}
          alt={product.name}
          height={400}
          width={400}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Only {product.stock} left
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of stock
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-sm" title={product.name}>
            {product.name.length > 15 ? `${product.name.slice(0, 15)}...` : product.name}
          </h3>
        </div>

        <div className="space-y-1 mb-2">
          <div className="flex items-center text-gray-600">
            <User className="h-3 w-3 mr-1 text-[#0099cc]" />
            <p className="text-xs truncate" title={product.producer.name}>
              {product.producer.name}
            </p>
          </div>

          <div className="flex items-center text-gray-600">
            <Tag className="h-3 w-3 mr-1 text-[#0099cc]" />
            <p className="text-xs truncate" title={product.category}>
              {product.category}
            </p>
          </div>

          <div className="flex items-center text-gray-600">
            <Package className="h-3 w-3 mr-1 text-[#0099cc]" />
            <p className="text-xs">Min 1 paket</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Per unit</p>
            <p className="text-xs font-bold text-[#0099cc]">{price}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Bundle (10)</p>
            <p className="text-xs font-bold text-[#0099cc]">{bundlePrice}</p>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <Link
            href={`/products/${product._id}`}
            className="bg-[#0099cc] text-white text-xs px-3 py-1 rounded-md hover:bg-[#007aa3] transition-colors"
          >
            Detail
          </Link>
        </div>
      </div>
    </div>
  )
}
