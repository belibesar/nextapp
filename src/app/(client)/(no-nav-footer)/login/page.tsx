"use client";

import GoBackButton from "@/components/layout/GoBackButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      toast.success(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });

      router.push("/");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-[#47A3D4] rounded-[10px] w-120 h-120 border-1 border-gray-200 px-10 py-10">
          <GoBackButton />
          <h2 className="font-bold text-3xl text-center mt-5 text-white">
            BeliBesar
          </h2>
          <p className="font-medium text-xl text-center text-white">Login</p>
          <form className="max-w-sm mx-auto mt-15" onSubmit={handleSubmit}>
            <div className="relative w-full max-w-md mt-6">
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
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500  transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Email
              </label>
            </div>
            <div className="relative w-full max-w-md mt-6">
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
                className="absolute left-0 -top-3 rounded-tr-[8px] rounded-tl-[8px] bg-white px-3 text-sm text-gray-500  transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:rounded-md"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className=" mt-12 group relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-[#202845] bg-[#202845] px-6 py-3 text-white font-medium transition duration-300 ease-in-out hover:bg-[#303e67] hover:border-[#303e67] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#303e67] focus:ring-offset-2 hover:cursor-pointer w-full h-9.5"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-700 mt-3 ">
            Don't have an account?
            <br />{" "}
            <a href="/register" className="text-white font-semibold">
              Register
            </a>{" "}
            here
          </p>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
