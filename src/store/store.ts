import { useAtomValue, useSetAtom } from "jotai";
import { atomWithHash } from "jotai-location";
import { selectAtom } from "jotai/vanilla/utils";
import { useCallback } from "react";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  dueAt?: number;
};

type State = {
  todos: Todo[];
};

type Action =
  | { type: "ADD_TODO"; id: string; title: string; dueAt?: number }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "EDIT_TODO"; id: string; title?: string; dueAt?: number };

const stateAtom = atomWithHash<State>("state", {
  todos: [],
});

export const useSelector = <Slice>(selector: (state: State) => Slice) =>
  useAtomValue(selectAtom(stateAtom, selector));

export const useDispatch = () => {
  const setState = useSetAtom(stateAtom);
  return useCallback(
    (action: Action) => {
      switch (action.type) {
        case "ADD_TODO":
          setState((prev) => ({
            ...prev,
            todos: [
              ...prev.todos,
              {
                id: action.id,
                title: action.title,
                completed: false,
                dueAt: action.dueAt,
              },
            ],
          }));
          break;
        case "REMOVE_TODO":
          setState((prev) => ({
            ...prev,
            todos: prev.todos.filter((todo) => todo.id !== action.id),
          }));
          break;
        case "TOGGLE_TODO":
          setState((prev) => ({
            ...prev,
            todos: prev.todos.map((todo) =>
              todo.id === action.id
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }));
          break;
        case "EDIT_TODO":
          setState((prev) => ({
            ...prev,
            todos: prev.todos.map((todo) =>
              todo.id === action.id
                ? {
                    ...todo,
                    title: action.title ? action.title : todo.title,
                    dueAt: action.dueAt ? action.dueAt : todo.dueAt,
                  }
                : todo
            ),
          }));
          break;
        default:
          throw new Error("unknown action");
      }
    },
    [setState]
  );
};
