const WebShare = () => {
  return (
    <>
      <p>web share</p>
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ text: "hello" });
          }
        }}
      >
        try share
      </button>
    </>
  );
};

export default WebShare;
