import React from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

const Navbar = async () => {
  const cookieStore = await cookies();
  const authorization = cookieStore.get('Authorization')?.value;
  return (
    <>
      <div className="navbar bg-[#008DCB] shadow-sm h-auto ">
        <div className="navbar-start">
          <Link
            href={'/'}
            className="text-white font-semibold text-[25px] pl-3">
            BeliBesar
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {/* <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul> */}
        </div>
        <div className="hidden lg:flex navbar-end">
          <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
            <Link
              href="/dashboard"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Dashboard
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
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
              href="/cart"
              className="relative group text-white text-sm flex items-center py-2.5"
            >
              Cart
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
            </Link>
          </div>
          {!authorization && (
            <Link
              className="btn btn-primary"
              href="/login"
            >
              Login
            </Link>
          )}
          {authorization && (
            <div className="flex flex-col relative w-auto h-10 ml-3 mr-3">
              <Link
                href="/profile"
                className="relative group text-white text-sm flex items-center py-2.5"
              >
                Profile
                <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </Link>
            </div>
          )}
        </div>

        <div className="dropdown dropdown-bottom lg:hidden navbar-end">
          <label tabIndex={0} className="btn btn-sm m-1 text-white bg-[#0075A4] border-none">
            Menu
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/orders">Orders</Link></li>
            <li><Link href="/cart">Cart</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
