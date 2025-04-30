import GoBackButton from '@/components/layout/GoBackButton';
import React from 'react';

export default function LoginPage(){
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className='bg-white rounded-[10px] w-120 h-120 border-1 border-gray-200 px-10 py-10'>
          <GoBackButton/>
          <p className='font-bold text-3xl text-center mt-5'>Sign in</p>
          <form className="max-w-sm mx-auto mt-20">
            <div className="relative w-full max-w-md mt-6">
              <input type="email" id="email" placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Email
              </label>
            </div>
            <div className="relative w-full max-w-md mt-6">
              <input type="password" id="email" placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Password
              </label>
            </div>
            <button type="submit" className=" mt-12 group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-blue-600 bg-blue-600 px-6 py-3 text-white font-medium transition duration-300 ease-in-out hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer w-full h-9.5">
              Submit
            </button>
          </form>
          <p className='text-center text-sm text-gray-700 mt-3'>Don't have an account?<br/> <a href='/register' className='text-blue-700'>Sign up</a></p>
        </div>
      </section>
    </>
  );
};