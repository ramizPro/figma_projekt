'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password) {
      alert("Fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      alert("Registration successful!");
      
      router.push("/api/auth/login");

    } catch (err) {
      alert(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="relative w-full h-screen">

      <Image src="/slike/background.png" alt="bg" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">TaskManager</h1>

        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 bg-blue-600 rounded text-white">Back</Link>
          <Link href="/auth/login" className="px-4 py-2 bg-white/10 rounded text-white">Login</Link>
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-80">

          <h1 className="text-2xl text-white text-center mb-4">Register</h1>

          <input 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-white/10 text-white"
          />

          <input 
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 rounded bg-white/10 text-white"
          />

          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-white/10 text-white"
          />

          <button onClick={handleRegister} className="w-full bg-blue-600 p-2 rounded text-white">
            Register
          </button>

        </div>
      </div>
    </div>
  );
}