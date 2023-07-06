import type { AppProps } from 'next/app'
import React, { KeyboardEventHandler, useState } from 'react'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {

  interface Task {
    id: number;
    name: string;
    complete: boolean;
  }

  const [list, setList] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [count, setCount] = useState(0);
  const [editingTaskID, setEditingTaskID] = useState<number | undefined>(undefined);

  function addTask(name: string) {
    if (name === "") {
      return;
    }
    setCount(count + 1);
    const newTask: Task = {
      id: count,
      name: name,
      complete: false
    };
    setList(list => [...list, newTask]);
    setInput("");
  };

  function clearTasks() {
    setList([]);
  }

  function toggleCheck(id: number) {
    const updatedList = list.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          complete: !task.complete,
        };
      }
      return task;
    });
    setList(updatedList);
  }

  function deleteTask(id: number) {
    const updatedList = list.filter(task => task.id !== id);
    setList(updatedList);
  }

  function editTask(id: number, newName: string) {
    const updatedList = list.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          name: newName,
          complete: task.complete
        };
      }
      return task;
    });
    setList(updatedList);
  }

  function handleInput(event: React.KeyboardEvent<HTMLInputElement>, edit: boolean, id: number | undefined) {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value;
      if (edit && editingTaskID !== undefined) {
        editTask(editingTaskID, inputValue);
      } else {
        addTask(inputValue);
      }
    }
    setEditingTaskID(undefined);
  }

  return (
    <div className="container">
      <Head>
        <title>To-Do List</title>
      </Head>
      <div>
        <div className="App">
          <h1 className="title">To-Do List</h1>
          <input
            type="text"
            value={input}
            placeholder="What is your new task?"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleInput(e, false, undefined)}
          />

          <div className="button-container">
            <button className="button" onClick={() => addTask(input)}>Add Task</button>
            <button className="button" onClick={() => clearTasks()}>Clear All</button>
          </div>



        </div>
        <div className="App-body">
          <ul>
            {list.map((task) => (
              <li key={task.id}>
                {editingTaskID === task.id ? (
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onBlur={() => setEditingTaskID(undefined)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleInput(e, true, task.id);
                        setEditingTaskID(undefined);
                      }
                    }
                    }
                  />
                ) : (
                  <span>{task.name}</span>
                )}
                <button onClick={() => deleteTask(task.id)}>&times;</button>
                <button onClick={() => { setEditingTaskID(task.id); setEditInput(task.name); }}> Edit</button>
                <button id="checkButton"
                  className="checkButton"
                  onClick={() => toggleCheck(task.id)}
                  style={{ color: task.complete ? 'green' : 'black' }}
                >
                  <span className="checkmark">&#10004;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
