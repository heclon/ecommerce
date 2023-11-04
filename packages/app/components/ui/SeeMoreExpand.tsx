import * as React from 'react'

interface SeeMoreExpandProps {
  children: JSX.Element
  minimiseHeight: number
}

/**
 * Can be wrapped around a single jsx element and used to truncate it's content.
 * A minimiseHeight prop is required for specifying the size of it's retracted state.
 * Clicking 'See more' will expand the element to its full height, revealing the
 * truncated content
 */
export function SeeMoreExpand({ children, minimiseHeight }: SeeMoreExpandProps): JSX.Element {
  const [expandedHeight, setExpandedHeight] = React.useState(0)
  const [minimised, setMinimised] = React.useState(false)
  const parentRef = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    // eslint-disable-next-line sonarjs/no-collapsible-if
    if (parentRef?.current?.clientHeight) {
      if (!minimised && expandedHeight < parentRef.current.clientHeight) {
        setExpandedHeight(parentRef.current.clientHeight)
        if (parentRef.current.clientHeight > minimiseHeight) {
          setMinimised(true)
        }
      }
    }
  }, [parentRef])

  const isActive = expandedHeight > minimiseHeight
  const onClick = () => {
    setMinimised(!minimised)
  }

  return (
    <>
      <div
        ref={parentRef}
        style={{
          maxHeight: minimised ? `${minimiseHeight}px` : expandedHeight > 0 ? `${expandedHeight}px` : '100%',
        }}
        className="transition-max-height overflow-hidden"
      >
        {children}
      </div>
      {isActive && (
        <button className="text-purple-heart-500 mt-2 text-sm font-light hover:underline" onClick={onClick}>
          {minimised ? 'See more' : ' See less'}
        </button>
      )}
    </>
  )
}
