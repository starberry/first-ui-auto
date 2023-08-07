import React, { useEffect, useRef, useState } from "react"
import "./assets/styles/_index.scss"

const ReadMore = ({ content, height, className }) => {
  const [showReadMore, setShowReadMore] = useState(false)
  const [readMore, setReadMore] = useState(true)
  const maxHeight = height || 260

  const elementRef = useRef()

  useEffect(() => {
    if (elementRef.current.clientHeight > maxHeight) {
      setShowReadMore(true)
    }

    if (readMore) {
      elementRef.current.style.maxHeight = maxHeight + "px"
    } else {
      elementRef.current.style.maxHeight = ""
    }
  }, [readMore])

  if (!content) return null

  return (
    <div className={`read-more-wrap ${className}`}>
      <div
        ref={elementRef}
        className={`${showReadMore ? `read-more-section` : ''} ${readMore ? `read-more` : ''}`}
      >
        <div dangerouslySetInnerHTML={{__html: content}}></div>
      </div>
      {showReadMore && (
        <button
          onClick={() => setReadMore(val => !val)}
          className={`read-more-button ${readMore ? "" : "read-less"}`}
        >
          {readMore ? "Read more" : "Read less"}
        </button>
      )}
    </div>
  )
}

export default ReadMore
