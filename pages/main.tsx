import "../styles/App.css";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";

export default function Main({ Component, pageProps }: AppProps) {
  interface Task {
    id: number;
    name: string;
  }
  const [list, setList] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  function addTask(name: string) {
    if (name === "") {
      setInput("Please input a task");
      return;
    }
    const newTask: Task = {
      id: list.length + 1,
      name: name,
    };
    setList((list) => [...list, newTask]);
    setInput("");
  }

  function clearTasks() {
    setList([]);
  }

  function deleteTask(id: number) {
    const updatedList = list.filter((task) => task.id !== id);
    setList(updatedList);
  }

  function editTask(name: string) {}

  return (
    <div className="container">
      <Head>
        <title>To-Do List</title>
      </Head>
      <div>
        <div className="App">
          <h1>To-Do List</h1>
          <input
            type="text"
            value={input}
            placeholder="What is your new task?"
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="button-container">
            <button className="button" onClick={() => addTask(input)}>
              Add Task
            </button>
            <button className="button" onClick={() => clearTasks()}>
              Clear All
            </button>
          </div>
        </div>
        <div className="App-body">
          <ul>
            {list.map((task) => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => deleteTask(task.id)}>&times;</button>
                <button> Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
