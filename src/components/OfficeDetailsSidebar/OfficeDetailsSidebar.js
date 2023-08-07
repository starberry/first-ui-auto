import React from "react";
import { Link } from "gatsby";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const OfficeDetailsSidebar = (props) => {

    var salesPhone = props?.sales_phone
    var salesEmail = props?.sales_email
    var lettingsPhone = props?.lettings_phone
    var lettingsEmail = props?.lettings_email
    return (
        <div className="office-details-sidebar-card-wrapper">
            <div className="office-details-sidebar-title">{props.title}</div>
            {(salesPhone?.length > 1 || salesEmail?.length > 1) &&
                <div className="sales-section">
                    <p>Sales: </p>
                    {salesPhone?.length > 1 ? <div className="office-details-sidebar-phone"><a href={`tel:${salesPhone}`}>{salesPhone}</a></div> : ""}
                    {salesEmail?.length > 1 ? <div className="office-details-sidebar-mail"><Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: salesEmail}}}>{salesEmail}</Link></div> : ""}
                </div>
            }
            {(lettingsPhone?.length > 1 || lettingsEmail?.length > 1) &&
                <div className="lettings-section">
                    <p>Lettings: </p>
                    {lettingsPhone?.length > 1 ? <div className="office-details-sidebar-phone"><a href={`tel:${lettingsPhone}`}>{lettingsPhone}</a></div> : ""}
                    {lettingsEmail?.length > 1 ? <div className="office-details-sidebar-mail"><Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: lettingsEmail}}}>{lettingsEmail}</Link></div> : ""}
                </div>
            }
            {props.phone?.length > 1 ? <div className="office-details-sidebar-phone"><a href={`tel:${props.phone}`}>{props.phone}</a></div> : ""}
            {props.email?.length > 1 ? <div className="office-details-sidebar-mail"><Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: props.email}}}>{props.email}</Link></div> : ""}
            {props.address && <div className="office-details-sidebar-address">{props.address}</div>}

            <div className="office-details-sidebar-divider-line"></div>

            {props.opening_hours && <div className="office-details-sidebar-title">Opening Hours</div> }
            {props.opening_hours && <ContentModule Content={props.opening_hours?.data?.opening_hours} />}
        </div>
    )
}

export default OfficeDetailsSidebar