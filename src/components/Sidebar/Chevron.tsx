const Chevron = ({
  expanded,
  isVisible,
}: {
  expanded: boolean
  isVisible: boolean
}) => {
  if (!expanded) {
    return (
      <span
        className={`${
          isVisible ? '' : 'invisible'
        } cursor-pointer select-none rounded py-1 px-1`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="parent-hover:text-blue h-5 w-5 text-gray-400 group-hover:text-indigo-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    )
  } else {
    return (
      <span
        className={`${
          isVisible ? '' : 'invisible'
        } inline-block cursor-pointer select-none rounded py-1 px-1 `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="parent-hover:text-blue h-5 w-5 text-gray-400 group-hover:text-indigo-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
    )
  }
}
export default Chevron
