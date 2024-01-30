// src/App.js
import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState(1);
  const [urgency, setUrgency] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);

  const addTask = () => {
    if (editingIndex !== null) {
      // If editing, update the existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { task, importance, urgency };
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // If not editing, add a new task
      const newTask = { task, importance, urgency };
      setTasks([...tasks, newTask]);
    }
    // Reset input fields
    setTask("");
    setImportance(1);
    setUrgency(1);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit.task);
    setImportance(taskToEdit.importance);
    setUrgency(taskToEdit.urgency);
    setEditingIndex(index);
  };

  const cancelEdit = () => {
    setTask("");
    setImportance(1);
    setUrgency(1);
    setEditingIndex(null);
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
    <div
      style={{ width: "" }}
      className="md:w-2/3 container mx-auto p-4 grid bg-gray-100 rounded shadow-lg mt-10 font-mono rounded-lg"
    >
      <h1 className="text-3xl font-bold p-3 text-indigo-500">
        Sort Your Task 🕐
      </h1>
      <p className="p-3 text-green-500">
        Increase productivity, prioritize your tasks
      </p>
      <div className="p-3">
        <label htmlFor="task" className="mr-2 ">
          <strong>First: Enter Your Task</strong>
        </label>{" "}
        <br />
        <textarea
          type="text"
          id="task"
          rows="3"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 mr-2 md:w-full rounded-lg"
        />
        <br />
        <br />
        <label htmlFor="importance" className="mr-2">
          <strong>Second: Evaluate the Importance</strong> <br /> (Insert value
          1-10, with 10 is the most important)
        </label>
        <br />
        <input
          type="number"
          id="importance"
          placeholder="Enter importance"
          value={importance}
          onChange={(e) =>
            setImportance(Math.max(1, Math.min(10, e.target.value)))
          }
          className="p-2 border border-gray-300 mr-2 rounded-lg"
        />
        <br />
        <br />
        <label htmlFor="urgency" className="mr-2">
          <strong>Third: Decide the Urgency</strong> <br /> (Insert value 1-5,
          with 5 is the most urgent)
        </label>
        <br />
        <input
          type="number"
          id="urgency"
          placeholder="Enter urgency"
          value={urgency}
          onChange={(e) => setUrgency(Math.max(1, Math.min(5, e.target.value)))}
          className="p-2 border border-gray-300 mr-2 rounded-lg"
        />
        <br />
        <br />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white py-2 px-4 w-40 rounded-lg"
        >
          {editingIndex !== null ? "Update Task" : "Add Task"} ➕
        </button>
        {editingIndex !== null && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 text-white p-2 ml-2"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <button
        onClick={bubbleSort}
        className="bg-green-500 text-white px-4 py-2 mb-4 w-40 m-3 rounded-lg"
      >
        Sort Tasks 🔁
      </button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} className="border p-2 mb-2 flex justify-between">
            <div>
              <span className="text-indigo-500 font-bold font-3xl">
                {" "}
                {t.task}
              </span>{" "}
              - Importance: {t.importance}, Urgency: {t.urgency}, Priority:{" "}
              {t.importance * t.urgency}
            </div>
            <div>
              <button
                onClick={() => editTask(index)}
                className="bg-yellow-500 text-white p-2 mr-2 rounded-lg m-1"
              >
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pen"
                  viewBox="0 0 16 16"
                >
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                </svg>
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white p-2 rounded-lg m-1"
              >
                Delete
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="52"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
