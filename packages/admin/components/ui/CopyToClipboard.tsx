import { ClipboardCopyIcon } from '@heroicons/react/outline'
import React from 'react'

interface Props {
  testId?: string
  textToCopy: string
}

export const CopyToClipboardButton = ({ textToCopy, testId }: Props) => {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      data-testid={testId}
      className="group relative"
      onClick={async () => {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2_500)
      }}
    >
      <div className="white invisible absolute left-2/4 -translate-y-12 translate-x-[-50%] whitespace-nowrap rounded-md bg-gray-800 text-center group-hover:visible">
        <p className="p-3 text-white">{copied ? 'Copied!' : textToCopy}</p>
      </div>

      <ClipboardCopyIcon
        width={24}
        height={24}
        fill="none"
        stroke="#7C3AED"
        className="transition-transform hover:scale-125"
      />
    </button>
  )
}
