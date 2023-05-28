/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { FormEvent, useState } from "react";
import { useDispatch } from "../store/store";
import { nanoid } from "nanoid";

export const AddItem = () => {
  const [title, setTitle] = useState("");
  const [dueAt, setDueAt] = useState(0);
  const dispatch = useDispatch();
  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = nanoid();
    const itemTitle = title;
    setTitle("");
    if (dueAt) {
      dispatch({
        type: "ADD_TODO",
        id: id,
        title: itemTitle,
        dueAt: dueAt,
      });
    } else {
      dispatch({
        type: "ADD_TODO",
        id: id,
        title: itemTitle,
      });
    }
  };
  return (
    <>
      <form onSubmit={add}>
        <input
          type="text"
          name="inputTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="bg-gray-200"
        />
        <input
          type="datetime-local"
          // onChange={(e) => e.target.value && setDueAt(new Date(e.target.value).getTime())}
          onChange={(e) => {
            if (e.target.value) {
              const inputTime = new Date(e.target.value);
              setDueAt(inputTime.getTime());
            }
          }}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};
