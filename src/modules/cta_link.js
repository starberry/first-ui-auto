import React from "react";
import { Link } from "gatsby";
import { menuLinks } from "../common/site/link";

const CTALink_Module = (props) => {

    var page_url = props?.link?.external_link ? props?.link?.external_link : props?.link?.slug ? menuLinks(props?.link) : "";

    if (page_url === "/home/") {
        page_url = "/"
    }

    const scrollTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <>
            {page_url ?
                <Link to={page_url} className={props.class ? props.class : ''} target={props?.target_window === "new_window" ? "_blank" : "_self"}>
                    {props.children ? props.children : props?.title}
                </Link>
                :
                <a href="javascript:;" {...props}>
                    {props.children ? props.children : props?.title}
                </a>
            }
        </>
    )
}
export default CTALink_Module;