import React, { useEffect, useState } from "react"

const formImageSrcSet = params => {
  const keys = Object.keys(params.transforms),
    keysLength = keys.length
  let imageSrcSet = {
    src: params.images[keys[keysLength - 1]],
    srcSet: "",
    sizes: ""
  }
  for (let index = 0; index < keysLength; index++) {
    let width = keys[index].substr(0, keys[index].search(/[a-z]/i))
    imageSrcSet.srcSet += `${params.images[keys[index]]} ${width}w, `
    imageSrcSet.sizes += `${params.transforms[keys[index]]} ${width}px, `
  }
  if (params.isTeamParam) {
    console.log(45678, params.transforms, params.images, imageSrcSet)
  }
  return imageSrcSet;
}

const SrcSetImage = ({ props }) => {
  const [Imgs, SetImgs] = useState({});
  useEffect(() => {
    if (props.images) {
      const ImageSrcSet = formImageSrcSet(props)
      SetImgs(ImageSrcSet);
    } else {
      SetImgs({});
    }
  }, [props]);
  return <img 
    {...Imgs}
    {...props.attr}
  />
}

export default SrcSetImage;