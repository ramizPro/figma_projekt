export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input 
          type="text" 
          placeholder="Email" 
          className="border p-2 mb-2 w-full"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 mb-4 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}