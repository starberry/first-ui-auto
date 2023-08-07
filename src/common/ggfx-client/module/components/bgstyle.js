import React from "react"
import styled from 'styled-components'

const formImageBg = params => {
  const keys = Object.keys(params.transforms),
    keysLength = keys.length;
  let imageSrc = `background-image: url(${params.images[keys[keysLength - 1]]});` //Last image always as default image
  for (let index = keysLength - 2; index >= 0; index--) {
    imageSrc += `@media ${params.transforms[keys[index]]} {
            background-image: url(${params.images[keys[index]]});
        }`
  }
  return imageSrc;
}

const BgImage = ({props}) => {
  if(props.images){
    const BgImageTag = styled[(props.tagname || "div")]`
      ${formImageBg(props)}`;
    return (
      <BgImageTag {...props.attr}>{props.children}</BgImageTag>
    )
  }
  return "";
}

export default BgImage;
