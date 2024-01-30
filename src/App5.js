import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [importance, setImportance] = useState(1);
  const [urgency, setUrgency] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedIndexes, setCompletedIndexes] = useState([]);

  const addTask = () => {
    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { task, importance, urgency };
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      const newTask = { task, importance, urgency };
      setTasks([...tasks, newTask]);
    }
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

  const markAsDone = (index) => {
    setCompletedIndexes([...completedIndexes, index]);
  };

  return (
    <div className="container grid grid-cols mx-auto rounded-lg shadow-lg p-4 bg-gray-200 font-mono md:w-[70%] md:mt-28">
      <h1 className="text-3xl font-bold mb-4">Task Sorting App</h1>
      <div className="mb-4">
        <label htmlFor="task" className="mr-2">
          Task:
        </label>
        <br />
        <input
          type="text"
          id="task"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 mr-2 rounded-lg"
        />
        <br />
        <br />
        <label htmlFor="importance" className="mr-2">
          Importance (1-10):
        </label>
        <br />
        <textarea
          type="number"
          id="importance"
          placeholder="Enter importance"
          value={importance}
          onChange={(e) =>
            setImportance(Math.max(1, Math.min(10, e.target.value)))
          }
          className="p-2 border border-gray-300 mr-2"
        />
        <br />
        <br />
        <label htmlFor="urgency" className="mr-2">
          Urgency (1-5):
        </label>
        <br />
        <input
          type="number"
          id="urgency"
          placeholder="Enter urgency"
          value={urgency}
          onChange={(e) => setUrgency(Math.max(1, Math.min(5, e.target.value)))}
          className="p-2 border border-gray-300 mr-2"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
        {editingIndex !== null && (
          <button
            onClick={cancelEdit}
            className="bg-gray-500 text-white p-2 ml-2 rounded-lg"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <button
        onClick={bubbleSort}
        className="md:w-[100px] bg-green-500 text-white p-2 mb-4 rounded-lg"
      >
        Sort Tasks
      </button>
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            className={`border p-2 mb-2 flex justify-between items-center ${
              completedIndexes.includes(index)
                ? "line-through text-gray-300"
                : ""
            }`}
          >
            <div>
              <span className="mr-2">{index + 1}.</span>
              {t.task} - Importance: {t.importance}, Urgency: {t.urgency},
              Priority: {t.importance * t.urgency}
            </div>
            <div>
              {!completedIndexes.includes(index) && (
                <button
                  onClick={() => editTask(index)}
                  className="bg-yellow-500 text-white p-2 mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white p-2 mr-2"
              >
                Delete
              </button>
              {!completedIndexes.includes(index) && (
                <button
                  onClick={() => markAsDone(index)}
                  className="bg-green-500 text-white p-2 rounded-lg"
                >
                  Done
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
