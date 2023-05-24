import { useCallback, useState } from "react";
import { useSelector } from "../store/store";
import { useInterval } from "react-use";

const LateItem = () => {
  const [lateNum, setLateNum] = useState(0);
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
  return (
    <>
      <p>there are {itemsList.length.toString()} overdue items</p>
    </>
  );
};

export default LateItem;
