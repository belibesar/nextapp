"use client";
import { ProductType } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function CreateGroupBuyPage({
  products
}: {
  products: ProductType[];
}) {
  // console.log(products, "products from create group buy page");
  const [formData, setFormData] = useState({
    productId: "",
    minimalTargetQuantity: "",
    maximalTargetQuantity: "",
    deadline: "",
    distributionLocation: "",
    description: ""
  });
  const [productName, setProductName] = useState("");
  const router = useRouter();

  const handleProductChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // console.log(e.target.value, "ini e.target.value");
    const name = e.target.value;
    setProductName(e.target.value);

    const selectedProduct = products.find((product) => product.name === name);

    setFormData((prev) => ({
      ...prev,
      productId: selectedProduct ? selectedProduct._id : ""
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // console.log(formData, "ini form data dari create group buy page");
      Object.values(formData).forEach((value) => {
        if (value === "") throw new Error("Please fill in all fields");
      });
      const res = await fetch("/api/group-buys", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        console.log("Group buy created successfully:", data);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Error creating group buy:", error);
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">
          Create Group Buy
        </h1>

        <form className="max-w-2xl" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Product</label>
            <div className="relative">
              <input
                placeholder="Product"
                list="product-list"
                name="productName"
                value={productName}
                onChange={handleProductChange}
                className="input input-bordered w-full rounded-md"
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

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">
              Minimal Target Quantity
            </label>
            <input
              placeholder="Minimum Order Quantity"
              type="number"
              name="minimalTargetQuantity"
              value={formData.minimalTargetQuantity}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">
              Maximal Target Quantity
            </label>
            <input
              placeholder="Maximum Order Quantity"
              type="number"
              name="maximalTargetQuantity"
              value={formData.maximalTargetQuantity}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Deadline</label>
            <div className="relative">
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="input input-bordered w-full rounded-md pr-10"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">
              Distribution Location
            </label>
            <input
              placeholder="Distribution Location"
              type="text"
              name="distributionLocation"
              value={formData.distributionLocation}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-700 mb-2">Description</label>
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full rounded-md"
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-md px-8"
            >
              Create
            </button>
          </div>
        </form>
      </main>
      <ToastContainer />
    </div>
  );
}
