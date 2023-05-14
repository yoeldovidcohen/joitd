import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { AddItem } from "./components/AddItem";

function App() {
  return (
    <div>
      <h1>hi</h1>
      <AddItem />
      <TodoList />
    </div>
  );
}

export default App;
