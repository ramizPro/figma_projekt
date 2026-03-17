import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Image src="/slike/background.png" alt="bg" fill className="object-cover"/>
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">
          TaskManager
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition">
            <a href="auth/login/" className="text-white">
              Login
            </a>
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">            <a href="auth/register/" className="text-white">
              Register
            </a>
          </button>
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          Task Manager
        </h1>
        <p className="text-lg text-gray-200 max-w-xl">
          Organize your tasks efficiently and stay productive.
        </p>
      </div>

    </div>
  );
}