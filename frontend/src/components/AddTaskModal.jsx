import { useState } from "react";

export default function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [task, setTask] = useState({
    title: "",
    priority: "Medium",
    deadline: "",
    progress: 0,
  });

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!task.title || !task.deadline) {
      alert("Please fill all required fields.");
      return;
    }

    onAddTask(task);

    setTask({
      title: "",
      priority: "Medium",
      deadline: "",
      progress: 0,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 rounded-3xl p-8 w-[450px] border border-slate-700">

        <h2 className="text-2xl font-bold text-white mb-6">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Task Title"
            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
            value={task.title}
            onChange={(e)=>
              setTask({...task,title:e.target.value})
            }
          />

          <select
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
            value={task.priority}
            onChange={(e)=>
              setTask({...task,priority:e.target.value})
            }
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <input
            type="date"
            className="w-full p-3 rounded-xl bg-slate-800 text-white"
            value={task.deadline}
            onChange={(e)=>
              setTask({...task,deadline:e.target.value})
            }
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-700 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
            >
              Save Task
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}