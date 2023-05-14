/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import { FormEvent, useState } from "react";
import { useDispatch } from "../store/store";
import { nanoid } from "nanoid";

export const AddItem = () =>{
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const add = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const id = nanoid();
        const itemTitle = title;
        setTitle("");
        dispatch({ type: "ADD_TODO", id: id, title: itemTitle });
    };
    return (
        <>
            <form onSubmit={add}>
                <input
                    type="text"
                    name="inputTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">submit</button>
            </form> 
            <h2>hi</h2>
        </>
    );
}
