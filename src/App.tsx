import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { AddItem } from "./components/AddItem";
import DueItem from "./components/DueItem";
import { PlayAlarm } from "./components/PlayAlarm";
import WebShare from "./components/WebShare";

function App() {
  return (
    <div>
      <DueItem />
      <AddItem />
      <TodoList />
      <PlayAlarm />
      <WebShare />
    </div>
  );
}

export default App;
