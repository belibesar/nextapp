'use client';

import GoBackButton from '@/components/layout/GoBackButton';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import dynamic from 'next/dynamic';

//disable ssr to avoid error
const MapComponent = dynamic(() => import('@/components/layout/MapComponent'), { ssr: false });

export default function RegisterPage() {
  //state to manage the form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');

  //contact state, line break for better readability
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('-');
  const [regency, setRegency] = useState('-');

  //bank account state
  const [bankName, setBankName] = useState('');
  const [accNumber, setAccNumber] = useState('');

  //succes and error state
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
              regency,
            },
          },
          bankAccount: {
            name: bankName,
            number: accNumber,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }

      setSuccess(data.message);
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
      setCompanyName('');
      setPhone('');
      setBankName('');
      setAccNumber('');
      setProvince('-');
      setRegency('-');

      toast.success(success, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });

      router.push('/login');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        const errorMessage = error.message.split(',');
        errorMessage.map((message) => {
          toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
        });
      } else {
        setError('Something went wrong!');
        toast.error('Something went wrong!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {}, [province, regency]);
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className=" mt-20 mb-20 bg-[#47A3D4] rounded-[10px] rounded-tl-[10px] w-250 h-auto border-1 border-gray-200 px-10 py-10">
          <GoBackButton />
          <h2 className="font-bold text-3xl text-center mt-5 text-white">BeliBesar</h2>
          <p className="font-base text-xl text-center text-white">Register</p>
          {error && (
            <span className=" bg-orange-600 p-2 block max-w-24 mx-auto rounded-md mt-3 mb-3">
              <p className="text-center text-white font-medium">Error</p>
            </span>
          )}

          <form
            className="max-w-medium mx-auto px-30"
            onSubmit={handleSubmit}
          >
            <div className="relative w-full max-w-medium mt-6">
              <input
                type="text"
                id="name"
                value={name}
                placeholder=" "
                className=" bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="name"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Name<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative w-full max-w-medium mt-6">
              <input
                type="email"
                id="email"
                value={email}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Email<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative w-full max-w-medium mt-6">
              <input
                type="password"
                id="password"
                value={password}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Password<span className="text-red-500">*</span>
              </label>
            </div>

            <div className="mt-6">
              <p className="text-sm text-white">
                Select Role:<span className="text-red-700">*</span>
              </p>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="admin"
                  name="role"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                <label
                  htmlFor="admin"
                  className="text-sm text-white"
                >
                  Admin
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="user"
                  name="role"
                  value="distributor"
                  checked={role === 'distributor'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                <label
                  htmlFor="user"
                  className="text-sm text-white "
                >
                  Distributor
                </label>
              </div>
            </div>

            <div className="relative w-full max-w-medium mt-5">
              <input
                type="text"
                id="companyName"
                value={companyName}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <label
                htmlFor="companyName"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Company Name<span className="text-red-500">*</span>
              </label>
            </div>

            <p className="mt-6 text-white text-medium font-bold">Contact </p>
            <p className="mt-6 text-white text-medium">
              Location<span className="text-red-700">*</span>
            </p>
            <div className="w-full rounded-md border border-gray-300">
              <MapComponent
                onLocationSelect={(provinces, regencies) => {
                  setProvince(provinces || '-');
                  setRegency(regencies || '-');
                }}
              />
            </div>
            <p className="text-sm text-white">Province: {province ?? '-'}</p>
            <p className="text-sm text-white">Regency: {regency ?? '-'}</p>

            <div className="relative w-full max-w-medium mt-6">
              <input
                type="number"
                id="phone"
                value={phone}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setPhone(e.target.value)}
              />
              <label
                htmlFor="phone"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Phone
              </label>
            </div>

            <p className="mt-6 text-white text-medium font-bold">
              Bank Account <span className="text-red-500">*</span>
            </p>
            <div className="relative w-full max-w-medium mt-6">
              <input
                type="text"
                id="bankName"
                value={bankName}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setBankName(e.target.value)}
              />
              <label
                htmlFor="bankName"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Bank Name<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative w-full max-w-medium mt-6">
              <input
                type="number"
                id="accNumber"
                value={accNumber}
                placeholder=" "
                className="bg-white peer w-full rounded-md px-3 pt-3 pb-2 text-sm text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-500"
                onChange={(e) => setAccNumber(e.target.value)}
              />
              <label
                htmlFor="accNumber"
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500 peer-placeholder-shown:text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Account Number<span className="text-red-500">*</span>
              </label>
            </div>
            <button
              type="submit"
              className=" mt-10 group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-[#FFFF00] bg-[#FFFF00] px-6 py-3 text-[#202845] font-semibold transition duration-300 ease-in-out hover:bg-[#E2E200] hover:border-[#E2E200] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#E2E200] focus:ring-offset-2 hover:cursor-pointer w-full h-9.5"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm text-white mt-3">
            Have an account?{' '}
            <a
              href="/login"
              className="text-white font-semibold"
            >
              Login
            </a>{' '}
            here
          </p>
        </div>
      </section>

      <ToastContainer limit={5} />
    </>
  );
}
