'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

export default function MainPage() {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [editTask, setEditTask] = useState<any | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 🔹 GET TASKS
  useEffect(() => {
    if (!session?.user?.id) return;

    fetch("/api/tasks", {
      credentials: "include", // ✅ IMPORTANT
    })
      .then(res => res.json())
      .then(setTasks);
  }, [session]);

  // 🔹 ADD TASK
  const handleAddTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      credentials: "include", // ✅ IMPORTANT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        importance,
        dueDate,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      alert("ERROR: " + text);
      return;
    }

    const newTask = await res.json();
    setTasks(prev => [...prev, newTask]);
    setOpen(false);
  };

  // 🔹 UPDATE TASK
  const handleUpdateTask = async () => {
    await fetch("/api/tasks", {
      method: "PATCH",
      credentials: "include", // ✅ IMPORTANT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editTask._id,
        title: editTask.title,
        description: editTask.description,
        importance: editTask.importance,
        dueDate: editTask.dueDate,
        status: editTask.status,
      }),
    });

    setTasks(tasks.map(t => t._id === editTask._id ? editTask : t));
    setEditTask(null);
  };

  // 🔹 DELETE TASK
  const handleDelete = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      credentials: "include", // ✅ IMPORTANT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setTasks(tasks.filter(t => t._id !== id));
    setEditTask(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <Image src="/slike/background.png" alt="bg" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur-md border-b border-white/10">
        <h1 className="text-xl font-semibold text-white">TaskManager</h1>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-white"
        >
          To make your planning easier
        </motion.h1>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-red-700 text-white transition"
        >
          Log-out
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 pt-28 px-6 text-white">

        {/* Add button */}
        <div className="mb-6">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl shadow-lg transition font-semibold"
          >
            + Add new task
          </button>
        </div>

        {/* BOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[
            { title: "Not started", status: "notStarted" },
            { title: "In progress", status: "inProgress" },
            { title: "Finished", status: "finished" },
          ].map(col => (
            <div
              key={col.status}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex justify-between mb-4">
                <h2>{col.title}</h2>
                <span>{tasks.filter(t => t.status === col.status).length}</span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter(t => t.status === col.status)
                  .map(task => (
                    <div
                      key={task._id}
                      onClick={() => setEditTask(task)}
                      className="p-3 rounded-xl bg-white/20 hover:bg-white/30 cursor-pointer"
                    >
                      <div>{task.title}</div>
                      <div className="text-xs flex justify-between mt-2">
                        <span>{task.importance}</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* ADD MODAL */}
      {open && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="bg-white p-6 rounded-xl text-black w-[400px] z-40">

            <input placeholder="Title" onChange={e => setTitle(e.target.value)} className="w-full mb-2 p-2" />
            <input placeholder="Description" onChange={e => setDescription(e.target.value)} className="w-full mb-2 p-2" />

            <select onChange={e => setImportance(e.target.value)} className="w-full mb-4 p-2">
              <option value="">Select importance</option>
              <option value="important">Important</option>
              <option value="normal">Normal</option>
              <option value="nonUrgent">Non-urgent</option>
            </select>

            <input type="date" onChange={e => setDueDate(e.target.value)} className="w-full mb-4 p-2" />

            <button onClick={handleAddTask} className="w-full bg-black text-white p-2 rounded">
              Add
            </button>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editTask && (
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditTask(null)} />
          <div className="bg-white p-6 rounded-xl text-black w-[400px] z-40">

            <input
              value={editTask.title}
              onChange={e => setEditTask({ ...editTask, title: e.target.value })}
              className="w-full mb-2 p-2"
            />

            <select
              value={editTask.status}
              onChange={e => setEditTask({ ...editTask, status: e.target.value })}
              className="w-full mb-4 p-2"
            >
              <option value="notStarted">Not started</option>
              <option value="inProgress">In progress</option>
              <option value="finished">Finished</option>
            </select>

            <button onClick={handleUpdateTask} className="bg-green-500 text-white p-2 w-full mb-2">
              Save
            </button>

            <button onClick={() => handleDelete(editTask._id)} className="bg-red-500 text-white p-2 w-full mb-2">
              Delete
            </button>

            <button onClick={() => setEditTask(null)} className="w-full p-2 border">
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}