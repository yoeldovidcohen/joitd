import { useAtom } from "jotai";
import { useAudio, useInterval } from "react-use";
import { playingState } from "../store/playing";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "../store/store";
import { isSameMinute } from "date-fns";

export const PlayAlarm = () => {
  const [dateTime, setDateTime] = useState(new Date());
  function refreshClock() {
    setDateTime(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  const playList = useSelector(
    useCallback(
      (state) =>
        state.todos.find(
          (todo) => todo.dueAt && isSameMinute(dateTime, new Date(todo.dueAt))
        ),
      [dateTime]
    )
  );

  const [shouldPlay, setShouldPlay] = useAtom(playingState);
  const intervalAction = () => {
    setShouldPlay(false);
    controls.seek(0);
  };
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    autoPlay: true,
  });
  useInterval(() => intervalAction(), 10000);

  return (
    <>
      {playList && dateTime.getSeconds() > 0 && dateTime.getSeconds() < 10 && (
        <>{audio}</>
      )}
    </>
  );
};
