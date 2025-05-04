import ProductCard from '@/components/fragments/ProductCard';
import React from 'react';

const Products = async() => {
  const res = await fetch('http://localhost:3000/api/products')
  
  const data = await res.json()
  
  return (
    <section className="container mx-auto px-4 py-8 flex-grow">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-8">Products</h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((product: any) => (
          <ProductCard
            key={product._id}
            name={product.name}
            category={product.category}
            producerName={product.producer.name}
            price={product.price} />
        ))}
      </div>

      {/* More Button */}
      <div className="flex justify-end mt-8">
        <button className="btn bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md">More</button>
      </div>
    </section>
  );
};

export default Products;
