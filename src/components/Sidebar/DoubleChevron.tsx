

const DoubleChevron = ({ leftRight }: { leftRight: "left" | "right" }) => {
    if (leftRight === "left") {
      return (
        <div className="rounded py-1 px-1 select-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 parent-hover:text-blue group-hover:text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="rounded py-1 px-1 select-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-400 parent-hover:text-blue group-hover:text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </div>
      );
    }
  };
  export default DoubleChevron;