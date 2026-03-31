'use client';

import Image from "next/image";
import { motion } from "framer-motion"; //za animacije

export default function Home() {
  return (
    <div className="relative w-full h-screen">
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

        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
            <a href="auth/login/">Login</a>
          </button>

          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <a href="auth/register/">Register</a>
          </button>
        </div>
      </div>

      {/* Animated Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-bold mb-4 text-white 
                    [-webkit-text-stroke:1px_black] 
                    drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
        >
          Task Manager
      </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg text-gray-200 max-w-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
        >
          Organize your tasks efficiently and stay productive.
      </motion.p>
      </div>
    </div>
  );
}