import React from 'react';
import {cookies} from 'next/headers';

const Navbar = async() => {
  const cookieStore = await cookies()
  const authorization = cookieStore.get('Authorization')?.value
  return (
    <>
      <div className="navbar bg-[#008DCB] shadow-sm h-auto">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl text-white">BeliBesar</a>
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
        <div className="navbar-end">
          <div className='flex flex-col relative w-auto h-10 ml-3 mr-3'>
            <a href="/products" className="relative group text-white text-sm flex items-center py-2.5">
              Products
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
          </div>
          <div className='flex flex-col relative w-auto h-10 ml-3 mr-3'>
            <a href="/orders" className="relative group text-white text-sm flex items-center py-2.5">
              Orders
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
          </div>
          <div className='flex flex-col relative w-auto h-10 ml-3 mr-3'>
            <a href="/cart" className="relative group text-white text-sm flex items-center py-2.5">
              Cart
              <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
          </div>
          {!authorization && 
            <a className="btn btn-primary" href='/login'>Login</a>
          }
          {authorization &&
            <div className='flex flex-col relative w-auto h-10 ml-3 mr-3'>
              <a href="/profile" className="relative group text-white text-sm flex items-center py-2.5">
                Profile
                <span className="absolute left-0 -bottom-3 h-1 w-full bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></span>
              </a>
            </div>
          }
        </div>
        
        
        
      </div>
    </>
  );
};

export default Navbar;
