

export default function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 mb-4">
      {/* O */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#C4B5FD"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      {/* X */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
      >
        <path
          d="M25 25 L75 75"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M75 25 L25 75"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* O */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="#C4B5FD"
          strokeWidth="10"
          fill="none"
        />
      </svg>
    </div>
  );
}