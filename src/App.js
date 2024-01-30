// src/App.js
import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState(1);
  const [urgency, setUrgency] = useState(1);

  const addTask = () => {
    const newTask = {
      task,
      importance,
      urgency,
    };
    setTasks([...tasks, newTask]);
    setTask("");
    setImportance(1);
    setUrgency(1);
  };

  const bubbleSort = () => {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < tasks.length - 1; i++) {
        const productA = tasks[i].importance * tasks[i].urgency;
        const productB = tasks[i + 1].importance * tasks[i + 1].urgency;
        if (productA < productB) {
          const temp = tasks[i];
          tasks[i] = tasks[i + 1];
          tasks[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    setTasks([...tasks]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Sorting App</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 mr-2"
        />
        <input
          type="number"
          placeholder="Importance (1-10)"
          value={importance}
          onChange={(e) =>
            setImportance(Math.max(1, Math.min(10, e.target.value)))
          }
          className="p-2 border border-gray-300 mr-2"
        />
        <input
          type="number"
          placeholder="Urgency (1-5)"
          value={urgency}
          onChange={(e) => setUrgency(Math.max(1, Math.min(5, e.target.value)))}
          className="p-2 border border-gray-300 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </div>
      <button onClick={bubbleSort} className="bg-green-500 text-white p-2">
        Sort Tasks
      </button>
      <ul className="mt-4">
        {tasks.map((t, index) => (
          <li key={index} className="border p-2 mb-2">
            {t.task} - Importance: {t.importance}, Urgency: {t.urgency},
            Priority: {t.importance * t.urgency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
