'use client';

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("Invalid credentials");
    } else {
      window.location.href = "/mainPage";
    }
  };

  return (
    <div className="relative w-full h-screen">

      {/* Background */}
      <Image
        src="/slike/background.png"
        alt="bg"
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">
          TaskManager
        </h1>

        <div className="flex gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Back
          </Link>

          <Link
            href="/auth/register"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 w-80">
          
          <h1 className="text-2xl font-bold mb-4 text-white text-center">
            Login
          </h1>

          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 mb-3 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white/20 bg-white/10 text-white placeholder-gray-300 p-2 mb-4 w-full rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button 
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}