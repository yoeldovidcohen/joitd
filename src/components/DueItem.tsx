import { useCallback, useState } from "react";
import { useSelector } from "../store/store";
import { useInterval } from "react-use";

const DueItem = () => {
  const [now, setNow] = useState(0)

  const itemsList = useSelector(
    useCallback(
      (state) =>
        state.todos.filter((todo) => !todo.completed && todo.dueAt && todo.dueAt < now),
      [now]
    )
  );
  useInterval(() => {
    setNow(Date.now())
  }, 1000);
//   useTitle(itemsList.length ? `${itemsList.length.toString()} todos` : "todos")
  return (
    <>
      <p>there are {itemsList.length ? itemsList.length.toString() : "no"} overdue items</p>
    </>
  );
};

export default DueItem;
