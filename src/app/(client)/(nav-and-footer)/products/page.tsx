'use client';

import ProductCard from '@/components/fragments/ProductCard';
import { ProductType } from '@/types/types';
import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { debounce } from 'lodash';

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchProducts = useCallback(
    async (pageNum: number, searchTerm: string) => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/products?page=${pageNum}&search=${searchTerm}`);
        const data = await res.json();
        console.log(data);
        if (data.length === 0 || data.length < 8) {
          setHasMore(false);
        }

        if (pageNum === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Debounced search function
  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        setPage(1);
        setHasMore(true);
        fetchProducts(1, value);
      }, 500),
    [fetchProducts]
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  // Load more products when "More" button is clicked
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore && !loading && page > 1) {
      setPage((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore, loading]);

  return (
    <section className="container mx-auto px-4 py-8 flex-grow min-h-screen">
      <h1 className="text-3xl font-bold text-[#1e293b] mb-4">Products</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0088c2]"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: ProductType) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {/* Loading indicator and load more button */}
      {loading && <div className="text-center my-4">Please Wait...</div>}

      {hasMore && (
        <div
          className="flex justify-center mt-8"
          ref={ref}
        >
          <button
            onClick={handleLoadMore}
            className="btn bg-[#0088c2] hover:bg-[#006fa0] text-white border-none rounded-md"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'More'}
          </button>
        </div>
      )}

      {!hasMore && products.length > 0 && <div className="text-center my-4 text-gray-500">No more products to load</div>}
    </section>
  );
};

export default Products;
