'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MainPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background */}
      <Image
        src="/slike/background.png"
        alt="bg"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        
        <h1 className="text-xl font-semibold text-white">
          TaskManager
        </h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white"
        >
          To make your planning and work experience easier
        </motion.h1>

        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-red-700 text-white transition">
            <a href="/">Log-out</a>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-24 px-6 h-full text-white">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ✅ FIXED BUTTON */}
            <div
              onClick={() => setOpen(true)}
              className="inline-block bg-blue-500/40 backdrop-blur-md px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-500/60 transition"
            >
              <h2 className="text-sm font-semibold">
                Add new task
              </h2>
            </div>

            {/* Finished */}
            <div className="bg-blue-500/40 backdrop-blur-md p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">
                Finished tasks
              </h2>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <div className="bg-blue-500/40 backdrop-blur-md p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">
                In progress
              </h2>
            </div>

            <div className="bg-blue-500/40 backdrop-blur-md p-4 rounded-xl">
              <h2 className="text-lg font-semibold mb-4">
                Not started
              </h2>
            </div>

          </div>
        </div>
      </div>

      {/* ✅ MODAL (MERGED HERE) */}
      {open && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">

          {/* BACKDROP */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />

          {/* CARD */}
          <div className="relative bg-blue-500/40 backdrop-blur-md rounded-2xl p-8 w-[400px] text-white shadow-2xl z-40">

            <label className="block text-center font-semibold mb-1">
              Name of task
            </label>
            <input className="w-full mb-4 p-2 rounded-md bg-white/70 text-black outline-none" />

            <label className="block text-center font-semibold mb-1">
              Description
            </label>
            <input className="w-full mb-4 p-2 rounded-md bg-white/70 text-black outline-none" />

            <label className="block text-center font-semibold mb-1">
              Importance of task
            </label>
            <input className="w-full mb-4 p-2 rounded-md bg-white/70 text-black outline-none" />

            <label className="block text-center font-semibold mb-1">
              Due date
            </label>
            <input type="date" className="w-full mb-6 p-2 rounded-md bg-white/70 text-black outline-none" />

            <button className="w-full bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
              Add new task
            </button>

          </div>
        </div>
      )}

    </div>
  );
}