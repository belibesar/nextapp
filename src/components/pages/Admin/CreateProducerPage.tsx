'use client';

import { useRouter } from 'next/navigation';
import type React from 'react';
import { useState } from 'react';

export default function CreateProducerPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: {
      phone: '',
      email: '',
      address: '',
    },
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as Record<string, string>),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/producers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });

      if (response.ok) {
        console.log('Producer created successfully!');
        setFormData({
          name: '',
          contact: {
            phone: '',
            email: '',
            address: '',
          },
        });
        router.push('/dashboard');
      } else {
        alert('Failed to create producer');
      }
    } catch (error) {
      console.error('Error creating producer:', error);
      alert('An error occurred while creating the producer');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Producer</h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6 space-y-6">
            {/* Producer Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-gray-700 font-medium">Producer Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full border-gray-300 border-2 focus:outline-none focus:border-[#008DCB]"
                required
              />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>

              {/* Phone */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700">Phone</span>
                </label>
                <input
                  type="tel"
                  name="contact.phone"
                  value={formData.contact.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full border-gray-300 border-2 focus:outline-none focus:border-[#008DCB]"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700">Email</span>
                </label>
                <input
                  type="email"
                  name="contact.email"
                  value={formData.contact.email}
                  onChange={handleChange}
                  className="input input-bordered w-full border-gray-300 border-2 focus:outline-none focus:border-[#008DCB]"
                  required
                />
              </div>

              {/* Address */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-gray-700">Address</span>
                </label>
                <textarea
                  name="contact.address"
                  value={formData.contact.address}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full h-24 border-gray-300 border-2 focus:outline-none focus:border-[#008DCB]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="btn bg-[#008DCB] hover:bg-[#007ab3] text-white border-none w-32"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
