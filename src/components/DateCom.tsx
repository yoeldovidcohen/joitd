const DateCome = () => {
  const theDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saterday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div className="m-2 md:m-4 lg:m-5 p-2 md:p-4 lg:p-5 text-center flex flex-col md:flex-row gap-1 md:gap-4 lg:gap-5 justify-center align-middle justify-items-center items-center	">
        <p className="text-6xl md:text-8xl lg:text-9xl order-1 md:order-2">
          {theDate.getDate()}
        </p>
        <p className="text-l md:text-xl lg:text-xl text-gray-400 order-2 md:order-1">
          {days[theDate.getDay()]}
        </p>
        <p className="text-4xl md:text-6xl lg:text-7xl order-3">
          {months[theDate.getMonth()]}
        </p>
        <p className="text-l md:text-xl lg:text-xl text-gray-400 order-4">
          {theDate.getFullYear()}
        </p>
      </div>
    </>
  );
};
export default DateCome;
