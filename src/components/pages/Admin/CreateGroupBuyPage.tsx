"use client"
import type { ProductType } from "@/types/types"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { ShoppingBag, Calendar, MapPin, FileText, Package, PackageCheck, ArrowRight } from "lucide-react"

export default function CreateGroupBuyPage({
  products,
}: {
  products: ProductType[]
}) {
  const [formData, setFormData] = useState({
    productId: "",
    minimalTargetQuantity: "",
    maximalTargetQuantity: "",
    deadline: "",
    distributionLocation: "",
    description: "",
  })
  const [productName, setProductName] = useState("")
  const router = useRouter()

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.value
    setProductName(e.target.value)

    const selectedProduct = products.find((product) => product.name === name)

    setFormData((prev) => ({
      ...prev,
      productId: selectedProduct ? selectedProduct._id : "",
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const findProduct = products.find((product) => product._id === formData.productId)
      if (!findProduct && productName) throw new Error("Invalid productId")

      Object.values(formData).forEach((value) => {
        if (value === "") throw new Error("Please fill in all fields")
      })

      const res = await fetch("/api/group-buys", {
        method: "POST",
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        const data = await res.json()
        console.log("Group buy created successfully:", data)
        toast.success("Group buy created successfully!", {
          position: "top-center",
          autoClose: 3000,
        })
        setTimeout(() => {
          router.push("/groupbuy")
        }, 1000)
      }
    } catch (error: any) {
      console.log("Error creating group buy:", error.message)
      if (error.message === "Invalid productId") {
        toast.error("Invalid product selection", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      } else {
        toast.error("Please fill in all fields", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-[#008DCB]" />
            Create Group Buy
          </h1>
          <p className="text-slate-500 mt-1">Organize a group purchase for better prices and shared shipping</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#1c6381] to-[#008DCB] text-white p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold">New Group Buy Details</h2>
            <p className="text-emerald-50 mt-1">Fill in the information below to create your group buy</p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="product" className="flex items-center gap-2 text-slate-700 font-medium">
                    <Package className="h-4 w-4 text-[#008DCB]" />
                    Product
                  </label>
                  <div className="relative">
                    <input
                      id="product"
                      placeholder="Select a product"
                      list="product-list"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                      className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-emerald-500 transition-colors"
                    />
                    <datalist id="product-list">
                      {products.map((product) => (
                        <option key={product._id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="deadline" className="flex items-center gap-2 text-slate-700 font-medium">
                    <Calendar className="h-4 w-4 text-[#008DCB]" />
                    Deadline
                  </label>
                  <input
                    id="deadline"
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="minQuantity" className="flex items-center gap-2 text-slate-700 font-medium">
                    <Package className="h-4 w-4 text-[#008DCB]" />
                    Minimal Target Quantity
                  </label>
                  <input
                    id="minQuantity"
                    placeholder="Minimum order quantity"
                    type="number"
                    name="minimalTargetQuantity"
                    value={formData.minimalTargetQuantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-blue-700 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="maxQuantity" className="flex items-center gap-2 text-slate-700 font-medium">
                    <PackageCheck className="h-4 w-4 text-[#008DCB]" />
                    Maximal Target Quantity
                  </label>
                  <input
                    id="maxQuantity"
                    placeholder="Maximum order quantity"
                    type="number"
                    name="maximalTargetQuantity"
                    value={formData.maximalTargetQuantity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-blue-700 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="location" className="flex items-center gap-2 text-slate-700 font-medium">
                  <MapPin className="h-4 w-4 text-[#008DCB]" />
                  Distribution Location
                </label>
                <input
                  id="location"
                  placeholder="Where will items be distributed?"
                  type="text"
                  name="distributionLocation"
                  value={formData.distributionLocation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-blue-700 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="flex items-center gap-2 text-slate-700 font-medium">
                  <FileText className="h-4 w-4 text-[#008DCB]" />
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Provide details about this group buy"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#008DCB] focus:border-blue-700 transition-colors resize-none"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Card Footer */}
          <div className="flex justify-between items-center bg-slate-50 rounded-b-lg border-t p-6">
            <button
              type="button"
              onClick={() => router.push("/groupbuy")}
              className="px-5 py-2 border border-slate-300 rounded-md text-slate-600 font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-gradient-to-r from-[#008DCB] to-[#0a5c7f] hover:from-[#2a87af] hover:to-[#008DCB] text-white font-medium flex items-center gap-2 transition-colors"
            >
              Create Group Buy <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  )
}
