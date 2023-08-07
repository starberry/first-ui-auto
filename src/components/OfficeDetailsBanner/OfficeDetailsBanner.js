import React from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import ScrollAnimation from 'react-animate-on-scroll';
import { Container, Row, Col } from "react-bootstrap";
import './assets/styles/_index.scss';
import { PageLinks } from "../../common/site/page-static-links";
import OfficeDetailsBannerImg from "../../images/office_details_banner_img.png";
const ImageModule = loadable(() => import("../../modules/image-render"));

const OfficeDetailsBanner = (props) => {
    var imagename = "office.image.details";
    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.image_Transforms) {
        processedImages = props?.imagetransforms?.image_Transforms;
    }

    var salesPhone = props?.sales_phone
    var salesEmail = props?.sales_email
    var lettingsPhone = props?.lettings_phone
    var lettingsEmail = props?.lettings_email

    return (
        <section className="office-details-banner-wrapper position-relative">
            <Container>
                <Row className="d-flex align-items-center">
                    <Col xl={4} className="order-xl-1 order-2">
                        <div className="office-details-banner-content-wrapper">
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}><h1 className="office-details-heading">{props.title}</h1></ScrollAnimation>
                            {(salesPhone?.length > 1 || salesEmail?.length > 1) &&
                                <div className="sales-section">
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                        <p>Sales:</p>
                                    </ScrollAnimation>
                                    {salesPhone?.length > 1 ?
                                        <div className="contact-card-mobile">
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                                <a href={`tel:${salesPhone}`}>{salesPhone}</a>
                                            </ScrollAnimation>
                                        </div>
                                    : ""}
                                    {salesEmail?.length > 1 ?
                                        <div className="contact-card-email">
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                                                <Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: salesEmail}}}>{salesEmail}</Link>
                                            </ScrollAnimation>
                                        </div>
                                    : ""}
                                </div>
                            }
                            {(lettingsPhone?.length > 1 || lettingsEmail?.length > 1) &&
                                <div className="lettings-section">
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                        <p>Lettings:</p>
                                    </ScrollAnimation>
                                    {lettingsPhone?.length > 1 ?
                                        <div className="contact-card-mobile">
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                                <a href={`tel:${lettingsPhone}`}>{lettingsPhone}</a>
                                            </ScrollAnimation>
                                        </div>
                                    : ""}
                                    {lettingsEmail?.length > 1 ?
                                        <div className="contact-card-email">
                                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                                                <Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: lettingsEmail}}}>{lettingsEmail}</Link>
                                            </ScrollAnimation>
                                        </div>
                                    : ""}
                                </div>
                            }
                            {props.phone?.length > 1 ?
                                <div className="contact-card-mobile">
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                        <a href={`tel:${props.phone}`}>{props.phone}</a>
                                    </ScrollAnimation>
                                </div>
                            : ""}
                            {props.email?.length > 1 ?
                                <div className="contact-card-email">
                                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                                        <Link to={`/${PageLinks.enquiry}/`} className="link-underline" state={{ data: {to_email_id: props.email}}}>{props.email}</Link>
                                    </ScrollAnimation>
                                </div>
                            : ""}
                            <div className="office-details-btn-wrapper">
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={400} offset={10}>
                                    <div className="office-details-btn">
                                        <Link to={`/${PageLinks.enquiry}/`} className="button button-primary w-100" state={{ data: { to_email_id: (salesEmail?.length > 1 && lettingsEmail?.length > 1) ? salesEmail +','+ lettingsEmail : salesEmail?.length > 1 ? salesEmail : lettingsEmail?.length > 1 ? lettingsEmail : props?.email } }}>Contact Office</Link>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={500} offset={10}>
                                    <div>
                                        <Link to={`/${PageLinks.valuation}/`} className="button button-secondary-outline w-100">Book a Valuation</Link>
                                    </div>
                                </ScrollAnimation>
                            </div>
                        </div>
                    </Col>
                    <Col xl={2} className="order-xl-2"></Col>
                    <Col xl={6} className="order-xl-3 order-1">
                        <div className="office-details-banner-img-wrapper position-static">
                            <div className="office-details-banner-img-zoom">
                                <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.strapi_id} classNames="img-fluid" />
                                {/* <img src={OfficeDetailsBannerImg} className="img-fluid" alt="" /> */}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeDetailsBanner