import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { AddItem } from "./components/AddItem";
import DueItem from "./components/DueItem";

function App() {
  return (
    <div>
      <h1 className="bg-red-500">Todo List</h1>
      <DueItem />
      <AddItem />
      <TodoList />
    </div>
  );
}

export default App;
