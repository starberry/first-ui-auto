import React from "react";
import { StaticImage } from "gatsby-plugin-image"

const HomeBannerImage = () => {

    return (
        <StaticImage src="../../images/home_banner.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid banner-img" />
    )

}

export default HomeBannerImage