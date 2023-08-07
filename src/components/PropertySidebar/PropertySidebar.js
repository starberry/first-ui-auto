import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import { StaticImage } from "gatsby-plugin-image";
import PropertyValuationCard from "./PropertyValuationCard";
import ImageModule from "../../modules/image-render";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const PropertySidebar = (props) => {

    const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                property_details_contact {
                    data {
                        property_details_contact
                    }
                }
            }
        }
    `);

    const contactdetails = data.strapiSiteConfig?.property_details_contact?.data?.property_details_contact;

    return (
        <div className="property-sidebar-wrapper">
            <Row>
                <Col xl={12} md={6}>
                    <div className="property-sidebar-card-wrapper">
                        <div className="property-sidebar-img">
                            {props?.propofficedata
                                ? <ImageModule
                                    ImageSrc={props?.propofficedata?.image}
                                    altText={`office_image`}
                                    imagetransforms={props?.propofficedata?.imagetransforms.imagetransforms}
                                    imagename={`office.image.full_image`}
                                    renderer=""
                                    strapi_id={props?.propofficedata?.strapi_id}
                                    classNames="img-fluid"
                                />
                                : <StaticImage src="../../images/property_detail_sidebar_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid" />
                            }
                        </div>
                        {props?.propofficedata ?
                            <div className="property-sidebar-content">
                                <div className="property-sidebar-title">{props?.propofficedata ? props?.propofficedata.title : contactdetails.title}</div>
                                <p className="property-sidebar-phone">{props?.propofficedata ? props?.propofficedata.phone : contactdetails.phone}</p>
                                <p className="property-sidebar-mail"><Link to={`/${PageLinks.enquiry}/`} className="link-underline">{props?.propofficedata ? props?.propofficedata.email : contactdetails.email}</Link></p>
                                <p className="property-sidebar-address">{props?.propofficedata ? props?.propofficedata.address : contactdetails.address}</p>
                            </div> :
                            <div className="property-sidebar-content">
                                <ContentModule Content={contactdetails} />
                            </div>}
                    </div>
                </Col>
                <Col xl={12} md={6}>
                    <PropertyValuationCard />
                </Col>
            </Row>
        </div>
    )
}

export default PropertySidebar