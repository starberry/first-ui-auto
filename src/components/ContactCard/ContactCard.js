import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import ImageModule from "../../modules/image-render";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';

const ContactCard = (props) => {
    var imagename = "office.image.full_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.image_Transforms) {
        processedImages = props?.imagetransforms?.image_Transforms;
    }
    var salesPhone = props?.sales_phone
    var salesEmail = props?.sales_email
    var lettingsPhone = props?.lettings_phone
    var lettingsEmail = props?.lettings_email
    return (
        <div className="contact-card-wrapper">
            <div className="contact-card-img">
                <Link to={`/${PageLinks.contact}/${props.slug}/`}>
                    <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText ? props?.image?.alternativeText : props.title} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                </Link>
            </div>
            <div className="contact-card-text">
                <Row>
                    <Col xl={8}>
                        <Link to={`/${PageLinks.contact}/${props.slug}/`}><div className="contact-card-title">{props.title}</div></Link>
                        {props.address && <div className="contact-card-text">{props.address}</div>}
                    </Col>
                    <Col xl={4}>
                        <div className="d-xl-flex justify-content-end">
                            <div>
                                {(salesPhone?.length > 1 || salesEmail?.length > 1) &&
                                    <div className="sales-section">
                                        {salesPhone?.length > 1 ?
                                            <div className="contact-card-mobile">
                                                <span>Sales: </span><a href={`tel:${salesPhone}`}>{salesPhone}</a>
                                            </div>
                                        : ""}
                                        {salesEmail?.length > 1 ?
                                            <div className="contact-card-email">
                                                <Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: salesEmail}}}>{salesEmail}</Link>
                                            </div>
                                        : ""}
                                    </div>
                                }
                                {(lettingsPhone?.length > 1 || lettingsEmail?.length > 1) &&
                                    <div className="lettings-section">
                                        {lettingsPhone?.length > 1 ?
                                            <div className="contact-card-mobile">
                                                <span>Lettings: </span><a href={`tel:${lettingsPhone}`}>{lettingsPhone}</a>
                                            </div>
                                        : ""}
                                        {lettingsEmail?.length > 1 ?
                                            <div className="contact-card-email">
                                                <Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: lettingsEmail}}}>{lettingsEmail}</Link>
                                            </div>
                                        : ""}
                                    </div>
                                }
                                {props.phone?.length > 1 ?
                                    <div className="contact-card-mobile">
                                        <a href={`tel:${props.phone}`}>{props.phone}</a>
                                    </div>
                                : ""}
                                {props.email?.length > 1 ?
                                    <div className="contact-card-email">
                                        <Link to={`/${PageLinks.enquiry}`} className="link-underline" state={{ data: {to_email_id: props.email}}}>{props.email}</Link>
                                    </div>
                                : ""}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ContactCard