import { useCallback } from "react";
import { useSelector } from "../store/store";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const itemsList = useSelector(
    useCallback((state) => state.todos.map((todo) => todo.id), [])
  );
  return (
    <>
      {itemsList.map((item) => (
        <>
          <TodoItem id={item} />
          <br />
        </>
      ))}
    </>
  );
};
