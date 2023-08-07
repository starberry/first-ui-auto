import { useEffect, useRef } from "react"

const useAutoPlayVideo = () => {
  const ref = useRef(null)

  const attemptPlay = () => {
    ref &&
      ref.current &&
      ref.current.play().catch(error => {
        console.error("Error attempting to play", error)
      })
  }

  useEffect(() => {
    attemptPlay()
  }, [])

  return ref
}

export default useAutoPlayVideo
