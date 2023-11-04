import React from 'react'
export interface SuggestionMessageProps {
  title: string
  body: string
}
export const SuggestionMessage = ({ title, body }: SuggestionMessageProps) => {
  return (
    <div className="flex flex-col rounded bg-blue-200 p-8">
      <div className="flex flex-row">
        <div className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>
        <div>
          <p className="mb-4 font-semibold">{title}</p>
          <p>{body}</p>
        </div>
      </div>
    </div>
  )
}
