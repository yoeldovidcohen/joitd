import { useAtom } from "jotai";
import { datenum } from "../store/datenum";
import { add } from 'date-fns'

const DateCome = () => {
  const [dm, setDm] = useAtom(datenum);
  // const theDate = new Date(new Date().setDate(new Date().getDate() + dm));
  const theDate = add(new Date(), {days: dm})

  // const theDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
      <div className="min-w-[90vw] flex flex-row justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 my-auto"
          onClick={() => setDm(dm - 1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 my-auto"
          onClick={() => setDm(dm + 1)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </>
  );
};
export default DateCome;
