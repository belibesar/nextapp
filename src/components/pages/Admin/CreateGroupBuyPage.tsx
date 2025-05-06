'use client';
import React, { useState } from 'react';

export default function CreateGroupBuyPage() {
  const [formData, setFormData] = useState({
    product: '',
    productName: '',
    minimalTargetQuantity: '',
    maximalTargetQuantity: '',
    deadline: '',
    distributionLocation: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Create Group Buy</h1>

        <form
          className="max-w-2xl"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Product</label>
            <div className="relative">
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="select select-bordered w-full appearance-none rounded-md"
              >
                <option
                  disabled
                  value=""
                >
                  Choose a Product
                </option>
                <option>Product 1</option>
                <option>Product 2</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Minimal Target Quantity</label>
            <input
              type="number"
              name="minimalTargetQuantity"
              value={formData.minimalTargetQuantity}
              onChange={handleChange}
              className="input input-bordered w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Maximal Target Quantity</label>
            <input
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
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-slate-700 mb-2">Distribution Location</label>
            <input
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
    </div>
  );
}
