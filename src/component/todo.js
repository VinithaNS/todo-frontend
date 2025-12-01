import React, { useEffect, useState } from "react";

import { getTasks, createTask, deleteTask, updateTask } from "../services/api";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.data);
  };

  const handleAddTask = async () => {
    if (!title || !description) return alert("Both fields required!");
    await createTask({ title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleUpdate = async (task) => {
    await updateTask(task._id, { completed: !task.completed });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ width: "50%", margin: "20px auto" }}>
      <h2>To-Do App</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleAddTask}>Add Task</button>
      <br />
      <br />

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </h3>
          <p>{task.description}</p>
          <button onClick={() => handleUpdate(task)}>
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoApp;
