"use client"

import { type GroupBuy, GroupBuyStatus } from "@/types/types"
import Image from "next/image"
import { useState } from "react"
import { Calendar, Users, Package, MapPin, AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface GroupBuyCardProps {
  groupBuy: GroupBuy
  onStatusChange?: (groupBuyId: string, newStatus: GroupBuyStatus) => void
}

export default function GroupBuyAdmin({ groupBuy, onStatusChange }: GroupBuyCardProps) {
  const [status, setStatus] = useState<GroupBuyStatus>(groupBuy.status)
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<GroupBuyStatus | null>(null)

  const getStatusColor = (status: GroupBuyStatus) => {
    switch (status) {
      case GroupBuyStatus.OPEN:
        return "bg-green-100 text-green-800"
      case GroupBuyStatus.WAITING_FULL_PAYMENT:
        return "bg-yellow-100 text-yellow-800"
      case GroupBuyStatus.PROCESSING:
        return "bg-blue-100 text-blue-800"
      case GroupBuyStatus.DONE:
        return "bg-purple-100 text-purple-800"
      case GroupBuyStatus.FAILED:
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: GroupBuyStatus) => {
    switch (status) {
      case GroupBuyStatus.OPEN:
        return "Open"
      case GroupBuyStatus.WAITING_FULL_PAYMENT:
        return "Waiting Payment"
      case GroupBuyStatus.PROCESSING:
        return "Processing"
      case GroupBuyStatus.DONE:
        return "Done"
      case GroupBuyStatus.FAILED:
        return "Failed"
      default:
        return "Unknown"
    }
  }

  const showConfirmation = (newStatus: GroupBuyStatus) => {
    if (newStatus === status) return
    setSelectedStatus(newStatus)

    // Create custom toast with confirmation buttons
    toast.info(
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span className="font-medium">Confirm Status Change</span>
        </div>
        <p>
          Are you sure you want to change status to <strong>{getStatusText(newStatus)}</strong>?
        </p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss()
              handleStatusChange(newStatus)
            }}
            className="px-3 py-1 bg-[#0099cc] hover:bg-[#0088bb] rounded-md text-white text-sm transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        position: "top-center",
        className: "rounded-lg shadow-lg border border-gray-200",
      },
    )
  }

  const handleStatusChange = async (newStatus: GroupBuyStatus) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`http://localhost:3000/api/group-buys/${groupBuy._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update status")
      }

      // Update local state
      setStatus(newStatus)

      // Notify parent component about the status change
      if (onStatusChange) {
        onStatusChange(String(groupBuy._id), newStatus)
      }

      // Show success toast
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          <div>
            <p className="font-medium">Status Updated Successfully</p>
            <p className="text-sm">Group buy status changed to {getStatusText(newStatus)}</p>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      )
    } catch (error) {
      console.error("Error updating group buy status:", error)

      // Show error toast
      toast.error(
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <div>
            <p className="font-medium">Update Failed</p>
            <p className="text-sm">Could not update group buy status</p>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
        },
      )
    } finally {
      setIsUpdating(false)
      setSelectedStatus(null)
    }
  }

  // Calculate progress percentage based on current orders vs min target quantity
  const progressPercentage = Math.min(Math.round((groupBuy.currentOrders / groupBuy.minTargetQuantity) * 100), 100)

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <figure className="relative h-48 w-full">
        <Image
          src={groupBuy?.productDetails?.img || "/placeholder.svg?height=192&width=384"}
          alt={groupBuy.productDetails?.name || "Product"}
          fill
          className="object-cover"
        />
      </figure>

      <div className="card-body p-4">
        {/* Status Badge */}
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {getStatusText(status)}
          </span>
          <span className="text-sm font-medium text-gray-500">ID: {String(groupBuy._id).substring(0, 8)}</span>
        </div>

        {/* Product Name */}
        <h2 className="card-title text-lg font-bold mb-2 line-clamp-1">
          {groupBuy.productDetails?.name || "Product Name"}
        </h2>

        {/* Price */}
        <p className="text-[#0099cc] font-bold mb-2">
          {groupBuy.productDetails?.price ? formatCurrency(groupBuy.productDetails.price) : "Price not available"}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="bg-[#0099cc] h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>

        {/* Progress Details */}
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{groupBuy.currentOrders} ordered</span>
          <span>Target: {groupBuy.minTargetQuantity}</span>
        </div>

        {/* Info Icons */}
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {formatDate(groupBuy.deadline)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{groupBuy.participants.length} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <Package className="h-4 w-4" />
            <span>Min order: {groupBuy.minUserOrder}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{groupBuy.distributionLocation}</span>
          </div>
        </div>

        {/* Deposit Info */}
        <div className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Deposit: </span>
          <span>{groupBuy.depositPercentage}%</span>
        </div>

        {/* Status Update */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
          <select
            className="select select-bordered w-full text-sm"
            value={selectedStatus || status}
            onChange={(e) => showConfirmation(e.target.value as GroupBuyStatus)}
            disabled={isUpdating}
          >
            <option value={GroupBuyStatus.OPEN}>Open</option>
            <option value={GroupBuyStatus.WAITING_FULL_PAYMENT}>Waiting Full Payment</option>
            <option value={GroupBuyStatus.PROCESSING}>Processing</option>
            <option value={GroupBuyStatus.DONE}>Done</option>
            <option value={GroupBuyStatus.FAILED}>Failed</option>
          </select>
        </div>

        {/* View Details Button */}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-sm bg-[#0099cc] hover:bg-[#0088bb] text-white border-none rounded-md">
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}
