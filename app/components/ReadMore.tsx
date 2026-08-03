'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'

interface ReadMoreProps {
  children: ReactNode
  maxChars?: number
  className?: string
}

export function ReadMore({ children, maxChars = 200, className = '' }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsTruncation, setNeedsTruncation] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Detect if content overflows after mount
  useEffect(() => {
    if (contentRef.current) {
      // Temporarily remove max-height to get full height
      const el = contentRef.current
      const originalMaxHeight = el.style.maxHeight
      el.style.maxHeight = 'none'
      const fullHeight = el.scrollHeight
      el.style.maxHeight = originalMaxHeight

      // If full height > 120px (our clamped height), we need truncation
      if (fullHeight > 130) { // tolerance
        setNeedsTruncation(true)
      }
    }
  }, [children])

  return (
    <div className={className}>
      <div
        ref={contentRef}
        className="relative overflow-hidden transition-all duration-500"
        style={{
          maxHeight: isExpanded ? 'none' : '120px',
        }}
      >
        {children}
        {!isExpanded && needsTruncation && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-primary-600 hover:text-gold-500 font-medium text-sm transition-colors"
        >
          {isExpanded ? 'Soma Kidogo' : 'Soma Zaidi →'}
        </button>
      )}
    </div>
  )
}