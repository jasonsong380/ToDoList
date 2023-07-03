import '../styles/App.css'
import type { AppProps } from 'next/app'
import React, {KeyboardEventHandler, useState} from 'react';
import Head from 'next/head'
import {ChangeEvent} from 'react'
import { Elsie_Swash_Caps } from 'next/font/google';

export default function App({ Component, pageProps }: AppProps) {
  
  interface Task{
    id: number;
    name: string;
    complete: boolean;
  }

  const [list, setList]=useState<Task[]>([]);
  const [input, setInput]=useState("");
  const [isEditing, setEditing]=useState(false);
  const [count, setCount]=useState(0);
  
  function addTask(name: string){
    if(name===""){
      return;
    }
    setCount(count+1);
    const newTask: Task={
      id: count,
      name: name,
      complete: false
    };
    setList(list => [...list,newTask]);
    setInput("");
  };

  function clearTasks(){
    setList([]);
  }

  function toggleCheck(){
    const button = document.getElementById("checkButton");
    button.classList.toggle("checked");
  }

  function deleteTask(id: number){
    const updatedList=list.filter(task=> task.id !== id);
    setList(updatedList);
  }

  function editTask(id: number, newName: string){
    setInput("New task name");
    list[id].name= newName;
  }

  function handleInput(event: React.KeyboardEvent<HTMLInputElement>, edit: boolean){
    if(event.key==="Enter"){
      const inputValue=event.currentTarget.value;
      if(edit===true){
      
      }else{
        addTask(inputValue);
      }
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
      placeholder="What is your new task?"
      onChange={(e)=>setInput(e.target.value)}
      onKeyDown={(e) => handleInput(e,isEditing)}
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
            {task.name}
            <button onClick={() =>  deleteTask(task.id)}>&times;</button>
            <button onClick={() =>  {setEditing(true); editTask(task.id);}}> Edit</button>
            <button id="checkButton" className="checkButton" onClick={() =>toggleCheck()}>
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
