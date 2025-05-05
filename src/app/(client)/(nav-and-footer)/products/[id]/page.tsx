import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductById = () => {
  return (
    <>
      <section className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-4">
          <Link
            href={'/products'}
            className="btn btn-sm bg-gray-200 hover:bg-gray-300 border-none text-gray-700 rounded-md px-6"
          >
            Back
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">Product</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-200 rounded-lg aspect-square md:aspect-auto md:h-96 overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Indomie Goreng"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Indomie Goreng</h2>
            <p className="text-xl text-gray-700">Indofood CBP</p>

            <p className="text-sm text-gray-600">Product ID: db343scf3432kx3900</p>

            <p className="text-base text-gray-700 mt-4">1 Paket - 500 karton</p>

            <p className="text-xl font-bold mt-2">
              Rp. 60.000.000<span className="text-gray-600 font-normal">/paket</span>
            </p>

            <div className="pt-4">
              <button className="btn bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md px-6">Add to Cart</button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
          <p className="text-gray-700">
            Indomie Goreng is a popular instant noodle product known for its authentic Indonesian flavor. This bulk package contains 500 cartons, perfect for retail distribution or large-scale food service operations.
          </p>
          <p className="text-gray-700">
            Each packet contains the signature fried noodles with a special blend of seasonings, including sweet soy sauce, savory oil, and a mix of spices that create the classic Indomie Goreng taste loved worldwide.
          </p>
          <p className="text-gray-700">
            Preparation is quick and simple: boil the noodles for 3 minutes, drain, then mix with the provided seasoning packets for an authentic Indonesian culinary experience. Ideal for quick meals, these noodles can be enhanced with
            additional ingredients like eggs, vegetables, or protein.
          </p>
          <p className="text-gray-700">
            Indofood CBP guarantees the quality and consistency of their flagship product, ensuring each packet delivers the same delicious taste that has made Indomie Goreng a household name across Southeast Asia and beyond.
          </p>
        </div>
      </section>
    </>
  );
};

export default ProductById;
