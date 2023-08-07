import React from "react";
import { getSrc } from "gatsby-plugin-image"
import ImageTransform from "../common/ggfx-client/module/components/image-transform";
import NoImage from "../images/no-image.png"

const ImageModule = (props) => {

 
    if(props.ImageSrc && props.ImageSrc.url){

        var image_url = props.ImageSrc.url;
        if(props.ImageSrc.url_sharp){
            image_url = getSrc(props.ImageSrc.url_sharp)
        }

        let alt_text = props.ImageSrc.alternativeText ? props.ImageSrc.alternativeText : props.altText;
        let lazyText=typeof props?.lazyLoading === "undefined" || props?.lazyLoading == true  ? "lazy" :"" 
    
        return (
            <>
                {props.imagename ? (
                    <ImageTransform imagesources={props.ImageSrc.url} renderer={props.renderer} imagename={props.imagename} attr={{className:props.classNames, alt: alt_text+" - "+process.env.GATSBY_SITE_NAME, loading:lazyText }} imagetransformresult={props.imagetransforms} id={props.strapi_id} />
                ) : (
                    <img src={props.ImageSrc.url} alt={alt_text+" - "+process.env.GATSBY_SITE_NAME} {...props} />
                )
                }
            </>
            
        )
    } else{ 
        return (
            <img src={NoImage} alt="img" />
        )
    }
    
}
export default ImageModule;