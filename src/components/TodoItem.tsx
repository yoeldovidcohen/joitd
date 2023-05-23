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
  const changeTodoItem = (title: string) =>
    dispatch({ type: "EDIT_TODO", title: title, id });
  const remove = () => dispatch({ type: "REMOVE_TODO", id });

  const [isOverdue, setIsOverdue] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editState, setEditState] = useState("");
  useInterval(() => {
    item?.dueAt && Date.now() > itemDate.getTime() && setIsOverdue(true);
  }, 1000);
  return (
    <>
      <div className="flex items-center bg-red-200 basis-1 gap-4 	justify-center	">
        <input
          type="checkbox"
          checked={item?.completed}
          onChange={toggleCompleted}
        />
        {!editMode && (
          <p
            style={{ textDecoration: item?.completed ? "line-through" : "" }}
            className={`block ${editMode ? "bg-green-200" : "bg-red-200"}`}
          >
            {item?.title}
          </p>
        )}
        {editMode && (
          <input
            type="text"
            defaultValue={item?.title}
            onChange={(e) => setEditState(e.target.value)}
            required
          />
        )}
        {!editMode && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => setEditMode(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        )}
        {editMode && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            onClick={() => {
              setEditMode(false);
              changeTodoItem(editState);
              setEditState("");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        )}

        {item?.dueAt && (
          <>
            {/* <span>{item.dueAt}</span> */}
            <p className="block">{itemDate.toLocaleDateString()}</p>
            <p className="block">{itemDate.toLocaleTimeString()}</p>
          </>
        )}
        {isOverdue && !item?.completed && (
          <>
            <p>overdue</p>
          </>
        )}

        {/* {item?.dueAt && (
        <>
          <span>{item.dueAt.getDate()}</span>
          <span>{item.dueAt.getTime()}</span>
        </>
      )} */}
        <button onClick={remove}>remove</button>
      </div>
    </>
  );
};
