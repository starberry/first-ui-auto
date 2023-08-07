import { useState, useEffect } from "react"

// hook to check if user has scrolled from top
// returns truthy value if scrolled
const useHasScrolled = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = event => {
      if (window.scrollY > 10) setScrolled(true)
      else setScrolled(false)
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return scrolled
}

export default useHasScrolled