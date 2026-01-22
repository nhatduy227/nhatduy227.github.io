'use client'

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="text-accent"
        fill="currentColor"
      >
        {/* Hexagon outline */}
        <path
          d="M20 2 L35 10 L35 30 L20 38 L5 30 L5 10 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Letter N */}
        <path
          d="M12 12 L12 28 M12 12 L28 28 M28 12 L28 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}
