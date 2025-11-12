"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

// ---
// ** DELETE ICON **
// ---
const DeleteIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.25 8.33333H41.6667V12.5H37.5V39.5833C37.5 40.734 36.5673 41.6667 35.4167 41.6667H6.25C5.09942 41.6667 4.16667 40.734 4.16667 39.5833V12.5H0V8.33333H10.4167V2.08333C10.4167 0.93275 11.3494 0 12.5 0H29.1667C30.3173 0 31.25 0.93275 31.25 2.08333V8.33333ZM33.3333 12.5H8.33333V37.5H33.3333V12.5ZM14.5833 18.75H18.75V31.25H14.5833V18.75ZM22.9167 18.75H27.0833V31.25H22.9167V18.75ZM14.5833 4.16667V8.33333H27.0833V4.16667H14.5833Z" fill="currentColor"/>
  </svg>
);


// ---
// ** 2. TASK ITEM COMPONENT **
// ---

// First, let's define what a "Task" object looks like for TypeScript
type Task = {
  id: number;
  title: string;
  subTitle: string;
  dueDate: string;
};

// A small component to render a single task
const TaskItem = ({ task, checked, onToggle, onDelete }: { 
  task: Task;
  checked: boolean;
  onToggle: (id: number) => void; 
  onDelete: (id: number) => void;
}) => (
  <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
    <input
      type="checkbox"
      checked={checked}
      onChange={() => onToggle(task.id)}
      className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
    />
    <div className="flex-1">
      <p className={`text-sm font-medium text-slate-900 ${checked ? 'line-through text-slate-500' : ''}`}>
        {task.title}
      </p>
      <p className={`text-xs text-slate-500 ${checked ? 'line-through' : ''}`}>{task.subTitle}</p>
      <p className={`text-xs text-slate-500 mt-1 ${checked ? 'line-through' : ''}`}>Due: {task.dueDate}</p>
    </div>
    <button 
      onClick={() => onDelete(task.id)}
      className="p-1 text-slate-400 hover:text-red-600 transition-colors"
      aria-label="Delete task"
    >
      <DeleteIcon />
    </button>
  </div>
);

// ---
// ** 3. ALL TASKS PAGE COMPONENT **
// ---
export default function AllTasksPage() {
  
  // Mock data for the tasks
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([
    { id: 1, title: "test 3", subTitle: "task 3", dueDate: "11/10/2025" },
    { id: 2, title: "test 2", subTitle: "task 2", dueDate: "11/6/2025" },
    { id: 3, title: "test", subTitle: "task 1", dueDate: "11/5/2025" },
  ]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);


  // Function to move tasks between lists
  const handleTaskToggle = (taskId: number) => {
    const taskToMove = inProgressTasks.find(t => t.id === taskId);

    if (taskToMove) {
      setInProgressTasks(inProgressTasks.filter(t => t.id !== taskId));
      setCompletedTasks([taskToMove, ...completedTasks]);
    } else {
      const taskToReopen = completedTasks.find(t => t.id === taskId);
      if (taskToReopen) {
        setCompletedTasks(completedTasks.filter(t => t.id !== taskId));
        setInProgressTasks([taskToReopen, ...inProgressTasks]);
      }
    }
  };

  const handleTaskDelete = (taskId: number) => {
    setInProgressTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setCompletedTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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
              <span className="text-xl font-bold text-gray-900">All Tasks</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 pt-0 overflow-y-auto">
          {/* Columns for tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* In Progress Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700">In Progress ({inProgressTasks.length})</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-4 border border-slate-200">
                {inProgressTasks.length > 0 ? (
                  inProgressTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      checked={false} 
                      onToggle={handleTaskToggle} 
                      onDelete={handleTaskDelete}
                    />
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No tasks in progress.</p>
                )}
              </div>
            </div>
            
            {/* Completed Column */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-600">Completed ({completedTasks.length})</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 h-full">
                {completedTasks.length > 0 ? (
                  completedTasks.map(task => (
                    <TaskItem 
                      key={task.id} 
                      task={task} 
                      checked={true} 
                      onToggle={handleTaskToggle} 
                      onDelete={handleTaskDelete} 
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[100px]">
                    <p className="text-sm text-slate-500">No completed tasks</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
