import { useLocation } from "react-use";

const WebShare =  () => {
  const location = useLocation();
  //
  const shareUrl = async () => {
    try {
      await navigator.share({ url: location.href });
    } catch {
      console.log("err")
    }
  };
  let canShare = false;
  try {
    canShare = navigator.canShare({ text: "hello" });
  } catch (error) {}

  // const canShare =  navigator.canShare({text:"hello"})
  return (
    <>
      <p>web share</p>
      {canShare && <button onClick={shareUrl}>share</button>}

      <p>{canShare ? "can" : "can't"} share</p>
    </>
  );
};

export default WebShare;
