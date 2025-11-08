'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TaskData {
  title: string;
  description: string;
  dueDate: string;
  reminder: boolean;
}

export default function CreateTaskPage() {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const task: TaskData = { title: taskTitle, description, dueDate, reminder };
    console.log(task);
    alert('Task Created Successfully!');
    setTaskTitle('');
    setDescription('');
    setDueDate('');
    setReminder(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
       {/* Left Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-500 to-purple-600 text-white p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#a855f7" strokeWidth="2" />
              <path d="M9 12l3 3 5-6" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold">ToDo.</span>
        </div>

        {/* Add New Button */}
        <button className="w-full bg-white text-purple-600 font-semibold py-2.5 rounded-full mb-8 hover:bg-gray-100 transition flex items-center justify-center gap-2">
          <span className="text-lg">+</span>
          Add New
        </button>

        {/* Navigation Menu */}
        <nav className="space-y-4 flex-1">
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <span className="text-xl">≡</span>
            <span className="font-medium">All Tasks</span>
          </div>
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Today</span>
          </div>
          <div className="flex items-center gap-3 text-white hover:bg-white/10 px-4 py-3 rounded-lg cursor-pointer transition">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M12 22h0m-4-2h8M10 2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium">Reminders</span>
          </div>
        </nav>

        {/* Logout */}
        <div className="flex items-center gap-3 bg-black/20 px-4 py-3 rounded-lg cursor-pointer hover:bg-black/30 transition">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5m0 0l-5-5m5 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-medium">Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-4 flex items-center justify-between">
            <button className="text-gray-600 hover:text-gray-900 text-2xl">☰</button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M9 12l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">ToDo.</span>
            </div>
          </div>
        </header>
        {/* Create Task Form */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 mt-8">Create New Task</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 space-y-6 max-w -lg mx-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your task"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-800">Set Reminder</h4>
              <p className="text-sm text-gray-500">Get notified about this task</p>
            </div>
            <button
              type="button"
              onClick={() => setReminder(!reminder)}
              className={`w-12 h-6 rounded-full p-1 transition-all ${
                reminder ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`h-4 w-4 bg-white rounded-full transform transition ${
                  reminder ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Create Task
          </button>
        </form>
      </main>
    </div>
  );
}


