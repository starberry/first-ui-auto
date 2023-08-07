import React from "react"
import BgImage from "./bgstyle"
import SrcSetImage from "./srcset"

const ShowProcessedImage = props => {
  if (props.renderer === "bgImg") {
    return <BgImage props={props} />
  }
  return <SrcSetImage props={props} />
}

export {
  ShowProcessedImage
}
