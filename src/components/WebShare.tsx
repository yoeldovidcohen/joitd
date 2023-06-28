import { useLocation } from "react-use";

const WebShare = () => {
  const location = useLocation();
  //
  const shareUrl = async () => {
    try {
      await navigator.share({ url: location.href });
    } catch {
      console.log("err");
    }
  };
  let canShare = false;
  try {
    canShare = navigator.canShare({ text: "hello" });
  } catch (error) { }

  // const canShare =  navigator.canShare({text:"hello"})
  return (
    <>
      <div className="flex flex-col place-items-center">
        <button
          className="bg-gray-500 enabled:hover:bg-gray-700 disabled:bg-gray-300 text-white font-bold py-2 px-4 rounded-full"
          disabled={!canShare}
          onClick={shareUrl}
        >
          share
        </button>
      </div>
    </>
  );
};

export default WebShare;
