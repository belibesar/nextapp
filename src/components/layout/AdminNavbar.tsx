import React from 'react';
import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <>
      <header className="bg-sky-500 text-white">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="text-xl font-bold">BeliBesar</div>

          {/* Mobile Menu Button - Only visible on small screens */}
          <div className="drawer drawer-end lg:hidden flex justify-end">
            <input
              id="my-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              <label
                htmlFor="my-drawer"
                className="btn btn-ghost drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div className="drawer-side z-10">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
                <li>
                  <a className="font-semibold">Dashboard</a>
                </li>
                <li>
                  <details>
                    <summary>Create</summary>
                    <ul>
                      <li>
                        <a>Product</a>
                      </li>
                      <li>
                        <a>Producer</a>
                      </li>
                      <li className="bg-sky-100 text-sky-800">
                        <a>Group Buy</a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <a>Products</a>
                </li>
                <li>
                  <a>Orders</a>
                </li>
                <li>
                  <a>Group Buy</a>
                </li>
                <li>
                  <a>Profile</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on small screens */}
          <nav className="hidden lg:flex px-4 py-2 gap-4">
            <Link
              href="/dashboard"
              className="hover:underline"
            >
              Dashboard
            </Link>
            <div className="dropdown dropdown-end">
              <Link
                href="#"
                className="hover:underline"
              >
                Create
              </Link>
              <ul className="dropdown-content z-[1] menu p-0 shadow bg-base-100 w-32 text-neutral">
                <li>
                  <a className="py-2 px-4 hover:bg-base-200">Product</a>
                </li>
                <li>
                  <a className="py-2 px-4 hover:bg-base-200">Producer</a>
                </li>
                <li>
                  <a className="py-2 px-4 bg-sky-100">Group Buy</a>
                </li>
              </ul>
            </div>
            <Link
              href="/products"
              className="hover:underline"
            >
              Products
            </Link>
            <Link
              href="/orders"
              className="hover:underline"
            >
              Orders
            </Link>
            <Link
              href="#"
              className="hover:underline"
            >
              Group Buy
            </Link>
            <Link
              href="/profile"
              className="hover:underline"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;
