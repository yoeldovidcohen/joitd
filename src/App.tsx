import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { atom, useAtom } from "jotai";
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
