import { useCallback } from "react";
import { useSelector } from "../store/store";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const itemsList = useSelector(
    useCallback(
      (state) =>
        state.todos
          .filter(
            (todo) =>
              !todo.dueAt ||
              (todo.dueAt &&
                new Date(todo.dueAt).toDateString() ===
                new Date().toDateString())
          )
          .map((todo) => todo.id),
      []
    )
  );
  return (
    <>
      {itemsList.map((item) => (
        <>
          <TodoItem id={item} key={item} />
          <br />
        </>
      ))}
    </>
  );
};
