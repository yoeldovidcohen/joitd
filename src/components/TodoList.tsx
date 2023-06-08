import { useCallback } from "react";
import { useSelector } from "../store/store";
import { TodoItem } from "./TodoItem";
import { add } from "date-fns";
import { useAtom } from "jotai";
import { datenum } from "../store/datenum";

export const TodoList = () => {
  const [dm, ] = useAtom(datenum);

  const itemsList = useSelector(
    useCallback(
      (state) =>
        state.todos
          .filter(
            (todo) =>
              !todo.dueAt ||
              (todo.dueAt &&
                new Date(todo.dueAt).toDateString() ===
                  add(new Date(), { days: dm }).toDateString())
              // new Date().toDateString()
          )
          .map((todo) => todo.id),
      [dm]
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
