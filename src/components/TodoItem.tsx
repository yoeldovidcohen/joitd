import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "../store/store";
import { useAudio, useInterval } from "react-use";
import { playingState } from "../store/playing";
import { useAtom } from "jotai";
import FaceCome from "./FaceCome";

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
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: true,
  });
  const [shouldPlay, setShouldPlay] = useAtom(playingState);
  useInterval(() => {
    item?.dueAt && Date.now() > item.dueAt && setIsOverdue(true);
    item?.dueAt &&
      Date.now() > item.dueAt &&
      Date.now() - 10000 < item.dueAt &&
      setShouldPlay(true);
    // : setShouldPlay(false);
  }, 1000);
  return (
    <>
      <div className="flex items-center bg-red-200 basis-1 gap-4 	justify-center flex-wrap">
        <input
          type="checkbox"
          checked={item?.completed}
          onChange={toggleCompleted}
        />
        {!editMode && (
          <p
            // style={{ textDecoration: item?.completed ? "line-through" : "" }}
            className={`block ${editMode ? "bg-green-200" : "bg-red-200"} ${
              item?.completed ? "line-through" : ""
            }`}
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
            <p className="block">{itemDate.toLocaleTimeString().slice(0, 5)}</p>
          </>
        )}
        {/* {isOverdue && !item?.completed && (
          <>
            <p>overdue</p>
          </>
        )} */}

        {/* {item?.dueAt && (
        <>
          <span>{item.dueAt.getDate()}</span>
          <span>{item.dueAt.getTime()}</span>
        </>
      )} */}
        {/* <button onClick={remove}>remove</button> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={remove}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <FaceCome completed={item?.completed} isOverdue={isOverdue} />
        {/* {isOverdue && !item?.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            // stroke="currentColor"
            className="w-6 h-6 stroke-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        )}
        {!isOverdue && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            // stroke="currentColor"
            className={`w-6 h-6 ${
              item?.completed ? "stroke-green-500" : "stroke-current"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        )} */}
      </div>
    </>
  );
};
