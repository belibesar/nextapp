'use client'

import GoBackButton from '@/components/layout/GoBackButton';
import { FormEvent, useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import dynamic from 'next/dynamic';

//disable ssr to avoid error
const MapComponent = dynamic(()=>import ('@/components/layout/MapComponent'), {ssr: false})

export default function RegisterPage(){
  //state to manage the form data
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [companyName, setCompanyName] = useState('')

  //contact state, line break for better readability
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('-')
  const [regency, setRegency] = useState('-')

  //succes and error state
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const router = useRouter();

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          companyName,
          contact: {
            phone,
            address: {
              province,
              regency
            }
          }
        })
      })
      const data = await res.json();

      if(!res.ok) {
        throw new Error(data.message || 'Something went wrong!')
      }

      setSuccess(data.message)
      setError('')
      setName('')
      setEmail('')
      setPassword('')
      setRole('')
      setCompanyName('')
      setPhone('')
      setProvince('-')
      setRegency('-')

      router.push('/login')

    } catch (error:unknown) {
      if(error instanceof Error) {
        setError(error.message)
      }
      else{
        setError('Something went wrong!')
      }
    }
  }

  useEffect(()=>{
    console.log('province: ', province);
    console.log('regency: ', regency);
  },[province, regency])
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className=' mt-20 bg-white rounded-tr-[10px] rounded-tl-[10px] w-250 h-auto border-1 border-gray-200 px-10 py-10'>
          <GoBackButton/>
          <p className='font-bold text-3xl text-center mt-5'>Register</p>
          <form className="max-w-medium mx-auto mt-20 px-30" onSubmit={handleSubmit}>
            <p className='mt-6 text-gray-800 text-medium font-bold'>User Details </p>
            <div className="relative w-full max-w-medium mt-6">
              <input type="text" id="name" value={name} placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500" onChange={(e)=>setName(e.target.value)}/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Name<span className='text-red-500'>*</span>
              </label>
            </div>
            <div className="relative w-full max-w-medium mt-6">
              <input type="email" id="email" value={email} placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500" onChange={(e)=>setEmail(e.target.value)}/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Email<span className='text-red-500'>*</span>
              </label>
            </div>
            <div className="relative w-full max-w-medium mt-6">
              <input type="password" id="password" value={password} placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500" onChange={(e)=> setPassword(e.target.value)}/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Password<span className='text-red-500'>*</span>
              </label>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-700">Select Role:<span className='text-red-500'>*</span></p>
              <div className="flex items-center mt-2">
                <input type="radio" id="admin" name="role" value="supplier" checked={role === 'supplier'} onChange={(e) => setRole(e.target.value)} className="mr-2" />
                <label htmlFor="admin" className="text-sm text-gray-700">Supplier</label>
              </div>
              <div className="flex items-center mt-2">
                <input type="radio" id="user" name="role" value="distributor" checked={role === 'distributor'} onChange={(e) => setRole(e.target.value)} className="mr-2" />
                <label htmlFor="user" className="text-sm text-gray-700">Distributor</label>
              </div>
            </div>

            <hr className='border-gray-300 border-0.5 mt-5'/>

            <p className='mt-6 text-gray-800 text-medium font-bold'>Company Details </p>
            <div className="relative w-full max-w-medium mt-10">
              <input type="text" id="companyName" value={companyName} placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500" onChange={(e)=> setCompanyName(e.target.value)}/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Company Name<span className='text-red-500'>*</span>
              </label>
            </div>

            <p className='mt-6 text-gray-800 text-medium'>Location<span className='text-red-500'>*</span></p>
            <div className='w-full rounded-md border border-gray-300'>
              <MapComponent onLocationSelect={(provinces,regencies) => {
                setProvince(provinces || '-')
                setRegency(regencies || '-')
              }} />
            </div>
            <p className='text-sm text-gray-700'>Province: {province ?? '-'}</p>
            <p className='text-sm text-gray-700'>Regency: {regency ?? '-'}</p>

            <div className="relative w-full max-w-medium mt-6">
              <input type="number" id="phone" value={phone} placeholder=" " className="peer w-full border border-gray-300 rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500" onChange={(e)=>setPhone(e.target.value)}/>
              <label className="absolute left-2 -top-3 bg-white px-1 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Phone
              </label>
            </div>
            <button type="submit" className=" mt-10 group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-blue-600 bg-blue-600 px-6 py-3 text-white font-medium transition duration-300 ease-in-out hover:bg-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:cursor-pointer w-full h-9.5">
              Submit
            </button>
          </form>
        </div>
        <div className='mb-20 bg-white rounded-br-[10px] rounded-bl-[10px] w-250 h-auto border-1 border-gray-200 px-10 py-6'>
        <p className='text-center text-sm text-gray-700'>Already have an account?<br/> <a href='/login' className='text-blue-700'>Sign in</a></p> 
        </div>
      </section>
    </>
  );
};