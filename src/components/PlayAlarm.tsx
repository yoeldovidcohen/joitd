import { useAtom } from "jotai";
import { useAudio, useInterval } from "react-use";
import { playingState } from "../store/playing";

export const PlayAlarm = () => {
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
      <p>alarm</p>
      {shouldPlay && (
        <>
          {audio}
          <p>alarm ringing</p>
        </>
      )}
    </>
  );
};
