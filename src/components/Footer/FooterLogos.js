import React from "react";
import { StaticImage } from "gatsby-plugin-image"

const FooterLogos = () => {

    return (
        <div className="footer-logo-module d-flex justify-content-xl-end">
            <ul className="list-inline d-md-flex align-items-center footer-logo-list">
                <li className="list-inline-item">
                    <StaticImage src="../../images/footer/guild_property.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid footer-logo logo1" />
                </li>
                <li className="list-inline-item">
                    <StaticImage src="../../images/footer/property_ombudsman.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid footer-logo logo2" />
                </li>
            </ul>
        </div>
    )

}

export default FooterLogos