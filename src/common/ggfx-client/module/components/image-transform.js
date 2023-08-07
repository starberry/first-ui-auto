import React, { useState, useEffect } from "react"
import { isEmpty, filter, merge, clone } from "lodash"
import { isBrowser } from "../../utility"
import IMAGE_TRANSFORMS from "../../../../../static/images/config.json"
import { GetUrlSet } from "../../client"
import { ShowProcessedImage } from "./show-image"

const STAGE_ENV = process.env.GATSBY_STRAPI_GGFX_ENV || "i.dev"

const ImageTransform = props => {
  if (isEmpty(props)) {
    console.log("ImageTransform is empty!")
    return ""
  } else if (isEmpty(props.imagesources) || isEmpty(props.imagename)) {
    console.log("ImageTransform source url or image name is empty!")
    return ""
  } else {
    return <ProcessImageTransform props={props}></ProcessImageTransform>
  }
}

const ProcessImageTransform = ({ props }) => {
  const SrcCftle = props.imagesources.substring(props.imagesources.indexOf(STAGE_ENV)),
    SrcImageFormat = SrcCftle.substring(SrcCftle.lastIndexOf(".") + 1),
    Format = isBrowser() ? (localStorage.getItem("GGFX-NOTWEBP") ? SrcImageFormat : "webp") : SrcImageFormat,
    ImageNameArray = props.imagename.split("."),
    Section = ImageNameArray.pop(),
    Field = ImageNameArray.pop(),
    Collection = ImageNameArray.join("."),
    Transforms = Object.keys(IMAGE_TRANSFORMS[Collection][Field][Section]["sizes"])
  let processedResult = {}
  if (!isEmpty(props.imagetransformresult)) {
    const PreProcessedResult = JSON.parse(props.imagetransformresult)
    if (!isEmpty(PreProcessedResult[SrcCftle])) {
      if (!isEmpty(PreProcessedResult[SrcCftle][Format])) {
        processedResult = PreProcessedResult[SrcCftle][Format]
      }
    }
  }
  const [Imgs, SetImgs] = useState(clone(processedResult))
  useEffect(() => {
    (async function() {
      let transformsToProcess
      if (isEmpty(processedResult)) {
        transformsToProcess = [...Transforms]
      } else {
        transformsToProcess = filter(Transforms, size => {
          if (typeof processedResult[size] === "undefined") {
            return size
          }
        })
      }
      if (!isEmpty(transformsToProcess)) {
        let finalResult = {};
        await Promise.all(transformsToProcess.map(async transform => {
          const { data } = await GetUrlSet({
            srcCftle: SrcCftle,
            format: Format,
            transforms: JSON.stringify([transform]),
            //Need to confirm because of i.dev/i.prod env so id could be change
            id: props.id,
            //Flag to update processed data into strapi collection
            updateFlag: true,
            fieldName: Field,
            modelName: Collection
          })
          finalResult = { ...finalResult, ...data }
        }))
        if (!isEmpty(finalResult)) {
          SetImgs(merge(processedResult, finalResult))
        }
      }
    })()
  }, [])
  return isEmpty(Imgs) ? "" : (
    <ShowProcessedImage {...props} images={Imgs}
                        transforms={IMAGE_TRANSFORMS[Collection][Field][Section]["sizes"]} />
  )
}

export default ImageTransform
