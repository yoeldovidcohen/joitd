import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "../store/store";
import { useInterval } from "react-use";

export const TodoItem = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const item = useSelector(
    useCallback((state) => state.todos.find((todo) => todo.id === id), [id])
  );
  const itemDate = new Date(item?.dueAt ? item.dueAt : 0);

  const toggleCompleted = () => dispatch({ type: "TOGGLE_TODO", id });
  const remove = () => dispatch({ type: "REMOVE_TODO", id });

  const [isOverdue, setIsOverdue] = useState(false);
  useInterval(() => {
      item?.dueAt && Date.now() > itemDate.getTime() && setIsOverdue(true);
  }, 1000);
  return (
    <>
      <input
        type="checkbox"
        checked={item?.completed}
        onChange={toggleCompleted}
      />
      <span style={{ textDecoration: item?.completed ? "line-through" : "" }}>
        {item?.title}
      </span>
      {item?.dueAt && (
        <>
          {/* <span>{item.dueAt}</span> */}
          <span>{itemDate.toLocaleDateString()}</span>
          <span>{itemDate.toLocaleTimeString()}</span>
        </>
      )}
      {isOverdue && !item?.completed &&(
        <>
          <span>overdue</span>
        </>
      )}
      {!item?.dueAt && (
        <>
          <span>{itemDate.toLocaleString()}</span>
        </>
      )}
      {/* {item?.dueAt && (
        <>
          <span>{item.dueAt.getDate()}</span>
          <span>{item.dueAt.getTime()}</span>
        </>
      )} */}
      <button onClick={remove}>remove</button>
    </>
  );
};
