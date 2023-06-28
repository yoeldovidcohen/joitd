import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";
import { PlayAlarm } from "./components/PlayAlarm";
import WebShare from "./components/WebShare";
import DateCome from "./components/DateCom";
import { AddItem } from "./components/AddItem";

function App() {
  return (
    <div>
      <DateCome />
      <AddItem />
      <TodoList />
      <PlayAlarm />
      <WebShare />
    </div>
  );
}

export default App;
