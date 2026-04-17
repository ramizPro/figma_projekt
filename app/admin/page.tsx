'use client';

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && (session.user as any).role !== "admin") {
      router.push("/");
    }
  }, [session]);

  useEffect(() => {
    fetch("/api/admin")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="p-10 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Admin Dashboard</h1>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Log out
        </button>
      </div>

      <p>Users: {data.usersCount}</p>

      <h2 className="mt-6">Users</h2>
      {data.users.map((u: any) => (
        <div key={u._id} className="border p-2 mb-2 flex justify-between items-center">
          <span>{u.email}</span>

          <button
            onClick={async () => {
              const confirmDelete = confirm("Delete this user?");
              if (!confirmDelete) return;

              await fetch("/api/admin", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: u._id, type: "user" }),
              });

              setData((prev: any) => ({
                ...prev,
                users: prev.users.filter((user: any) => user._id !== u._id),
                usersCount: prev.usersCount - 1,
              }));
            }}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <h2 className="mt-6">Tasks</h2>
      {data.tasks.map((t: any) => (
        <div
          key={t._id}
          className="border p-3 mb-2 flex justify-between items-center rounded"
        >
          <div>
            <p className="font-semibold">{t.title}</p>
            <p className="text-sm opacity-70">{t.description}</p>
            <p className="text-xs mt-1">
              User: {t.userEmail || "unknown"}
            </p>
            <p className="text-xs">
              Status: {t.status}
            </p>
          </div>

          <button
            onClick={async () => {
              const confirmDelete = confirm("Delete this task?");
              if (!confirmDelete) return;

              const res = await fetch("/api/admin", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: t._id, type: "task" }),
              });

              if (res.ok) {
                setData((prev: any) => ({
                  ...prev,
                  tasks: prev.tasks.filter((task: any) => task._id !== t._id),
                }));
              }
            }}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}