'use client';
import { ProductType } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function CreateGroupBuyPage({ products }: { products: ProductType[] }) {
  const [formData, setFormData] = useState({
    productId: '',
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
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/group-buys', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Group buy created successfully:', data);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error creating group buy:', error);
    }
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
                name="productId"
                onChange={handleChange}
                className="select select-bordered w-full appearance-none rounded-md"
              >
                <option value={''}>Choose a Product</option>
                {products.map((product) => {
                  return (
                    <option
                      key={product._id}
                      value={product._id}
                      className="capitalize"
                    >
                      {product.name}
                    </option>
                  );
                })}
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
