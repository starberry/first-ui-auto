import { useMediaQuery } from "./useMediaQuery"

// return truthy value for media queries
const useDeviceMedia = props => {
  // default min max
  const { min, max } = props ? props : { min: "0px", max: "0px" }

  const isMobile = useMediaQuery("(max-width: 743px)")
  const isTabletOnly = useMediaQuery(
    "(min-width: 744px) and (max-width: 1023px)"
  )
  const isTablet = useMediaQuery("(max-width: 1023px)")
  const isTabletLarge = useMediaQuery("(max-width: 1024px)")

  const isLargeScreen = useMediaQuery("(max-width: 1200px)")
  const isLargeScreenOnly = useMediaQuery(
    "(min-width: 1023px) and (max-width: 1279px)"
  )
  const isXLargeScreen = useMediaQuery("(max-width: 1535px)")
  const isXLargeScreenOnly = useMediaQuery(
    "(min-width: 1280px) and (max-width: 1535px)"
  )
  const isDesktopOnly = useMediaQuery("(min-width: 1536px)")
  const isCustomMin = useMediaQuery(`(min-width: ${min})`)
  const isCustomMax = useMediaQuery(`(max-width: ${max})`)

  return {
    isMobile,
    isTablet,
    isTabletOnly,
    isLargeScreen,
    isLargeScreenOnly,
    isXLargeScreen,
    isXLargeScreenOnly,
    isDesktopOnly,
    isCustomMin,
    isCustomMax,
    isTabletLarge,
  }
}

export default useDeviceMedia
