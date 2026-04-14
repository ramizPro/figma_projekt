'use client';

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔄 LOAD USER DATA
  useEffect(() => {
    fetch("/api/profile", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setUsername(data.username || "");
        setEmail(data.email || "");
      });
  }, []);

  // ✏️ UPDATE USER
  const handleUpdate = async () => {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Profile updated!");
  };

  // ❌ DELETE ACCOUNT
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    await fetch("/api/profile", {
      method: "DELETE",
      credentials: "include",
    });

    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="relative w-full h-screen">

      <Image src="/slike/background.png" alt="bg" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {/* NAV */}
      <div className="absolute top-0 left-0 w-full flex justify-between px-8 py-4 bg-black/60 text-white">
        <h1>Profile</h1>
        <Link href="/mainPage">Back</Link>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-96 text-white">

          <h2 className="text-xl mb-4 text-center">My Profile</h2>

          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-white/20"
          />

          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full mb-3 p-2 rounded bg-white/20"
          />

          <input
            type="password"
            placeholder="New password"
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-white/20"
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 p-2 rounded mb-3"
          >
            Save changes
          </button>

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 p-2 rounded"
          >
            Delete account
          </button>

        </div>
      </div>
    </div>
  );
}