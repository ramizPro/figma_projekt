'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (!session) return;

    setUsername((session.user as any)?.name || "");
    setEmail((session.user as any)?.email || "");
  }, [session]);

  if (status === "loading") {
    return <div className="text-white p-10">Loading...</div>;
  }

  const handleUpdate = async () => {
    const res = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Updated!");
  } else {
    alert(data.error);
  }
};

  const handleDelete = async () => {
  const confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;

  const res = await fetch("/api/profile", {
    method: "DELETE",
  });

  const data = await res.json();

  if (res.ok) {
    signOut({ callbackUrl: "/" });
  } else {
    alert(data.error);
  }
};

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      <Image src="/slike/background.png" alt="bg" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {/* NAV */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">

        <h1 className="text-xl font-semibold text-white">
          TaskManager
        </h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white"
        >
          Your Profile
        </motion.h1>

        <div className="flex items-center gap-4">
          <a href="/mainPage" className="text-white hover:underline">
            Back
          </a>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-red-700 text-white transition"
          >
            Log-out
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-28 flex justify-center items-center min-h-screen">

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-96 text-white shadow-xl">

          <h2 className="text-xl mb-4 text-center font-semibold">
            My Profile
          </h2>

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-white/20 outline-none"
          />

          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full mb-3 p-2 rounded bg-white/20 outline-none"
          />

          <input
            type="password"
            placeholder="New password"
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-white/20 outline-none"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded mb-3 transition"
          >
            Save changes
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 p-2 rounded transition"
          >
            Delete account
          </button>

        </div>
      </div>

    </div>
  );
}