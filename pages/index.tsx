import type { AppProps } from 'next/app'
import React, { KeyboardEventHandler, useState } from 'react'
import Head from 'next/head'
import { Select } from 'antd';
const { Option } = Select;


export default function App({ Component, pageProps }: AppProps) {

  interface Task {
    id: number;
    name: string;
    complete: boolean;
    delete: boolean;
  }

  const [list, setList] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [count, setCount] = useState(0);
  const [editingTaskID, setEditingTaskID] = useState<number | undefined>(undefined);
  const [searchName, setSearchName] = useState<string | undefined>(undefined);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showAll, setShowAll] = useState(false);



  function addTask(name: string) {
    if (name === "") {
      return;
    }
    setCount(count + 1);
    const newTask: Task = {
      id: count,
      name: name,
      complete: false,
      delete: false
    };
    setList(list => [...list, newTask]);
    setInput("");
  };

  function searchTask(name: string) {
    setSearchName(name);
    setInput("");
  }

  function clearTasks() {
    setList([]);
  }

  function deleteCheckedTasks() {
    const updatedList = list.filter(task => task.delete === false);
    setList(updatedList);
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

  function toggleDelete(id: number) {
    const updatedList = list.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          delete: !task.delete,
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
          complete: task.complete,
          delete: task.delete
        };
      }
      return task;
    });
    setList(updatedList);
  }

  function handleInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value;
      addTask(inputValue);
    }
  }

  function handleEditInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const inputValue = event.currentTarget.value;
      if (editingTaskID !== undefined) {
        editTask(editingTaskID, inputValue);
        setEditingTaskID(undefined);
      }
    }
  }

  function handleOptionChange(option: string) {
    if (option === "Incomplete") {
      setShowIncomplete(true);
      setShowComplete(false);
      setShowAll(false);
    } else if (option === "Complete") {
      setShowComplete(true);
      setShowIncomplete(false);
      setShowAll(false);
    } else {
      setShowComplete(false);
      setShowIncomplete(false);
      setShowAll(true);
    }
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
            placeholder="Please input task name"
            onChange={(e) => { setInput(e.target.value); setSearchName(undefined); }}
            onKeyDown={(e) => handleInput(e)}
          />

          <div className="button-container">
            <button className="button" onClick={() => addTask(input)}>Add Task</button>
            <button className="button" onClick={() => clearTasks()}>Clear All</button>
            <button className="button" onClick={() => searchTask(input)}>Search</button>
            <button className="button" onClick={() => deleteCheckedTasks()}>Delete Marked Tasks</button>
            <Select defaultValue="Incomplete" onChange={handleOptionChange}>
              <Option value="Incomplete">Incomplete Tasks</Option>
              <Option value="Complete">Complete Tasks</Option>
              <Option value="All">All Tasks</Option>
            </Select>
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
                        handleEditInput(e);
                      }
                    }
                    }
                  />
                ) : searchName === task.name && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) ? (
                  <span>{task.name}</span>
                ) : (
                  searchName === undefined && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) && <span>{task.name}</span>
                )}

                {(searchName === task.name || searchName === undefined) && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) && <button onClick={() => deleteTask(task.id)}>&times;</button>}
                {(searchName === task.name || searchName === undefined) && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) && <button onClick={() => { setEditingTaskID(task.id); setEditInput(task.name); }}> Edit</button>}
                {(searchName === task.name || searchName === undefined) && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) && <button id="checkButton"
                  className="checkButton"
                  onClick={() => toggleCheck(task.id)}
                  style={{ color: task.complete ? 'green' : 'black' }}
                >
                  <span className="checkmark">&#10004;</span>
                </button>}
                {(searchName === task.name || searchName === undefined) && (showAll || (showComplete && task.complete) || (showIncomplete && !task.complete)) && <button id="checkButton"
                  className="checkButton"
                  onClick={() => toggleDelete(task.id)}
                  style={{ color: task.delete ? 'red' : 'black' }}
                >
                  <span className="checkmark">&#10004;</span>
                </button>}

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div >
  );
}
