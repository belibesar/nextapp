import React from "react";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <>
      <div className="navbar bg-[#008DCB] text-white shadow-sm h-auto">
        <div className="navbar-start">
          <Link
            href={"/"}
            className="text-white font-semibold text-[25px] pl-3"
          >
            BeliBesar
          </Link>
        </div>

        {/* Mobile Menu Button - Only visible on small screens */}
        <div className="drawer drawer-end lg:hidden flex justify-end z-[100]">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
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
                <Link href={"/dashboard"} className="font-semibold">
                  Dashboard
                </Link>
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
                      <Link href={"/groupbuy/create"}>Group Buy</Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link href={"/products"}>Products</Link>
              </li>
              <li>
                <Link href={"/orders"}>Orders</Link>
              </li>
              <li>
                <Link href={"/groupbuy"}>Group Buy</Link>
              </li>
              <li>
                <Link href={"/profile"}>Profile</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on small screens */}
        <nav className="hidden lg:flex navbar-end">
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/dashboard"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Dashboard
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
              <Link
                href="#"
                className="relative group text-white text-sm flex items-center py-2.5"
              >
                Create
                <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </Link>
            </div>
            <ul className="dropdown-content z-[1] menu p-0 shadow bg-base-100 w-32 text-neutral">
              <li>
                <Link href={"#"} className="py-2 px-4 hover:bg-base-200">
                  Product
                </Link>
              </li>
              <li>
                <Link href={"#"} className="py-2 px-4 hover:bg-base-200">
                  Producer
                </Link>
              </li>
              <li>
                <Link
                  href={"/groupbuy/create"}
                  className="py-2 px-4 bg-sky-100"
                >
                  Group Buy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/products"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Products
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/orders"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Orders
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/groupbuy"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Group Buy
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/profile"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Profile
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default AdminNavbar;
