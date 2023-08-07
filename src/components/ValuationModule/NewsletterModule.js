import React from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import { Container, Row, Col } from "react-bootstrap";
import SubscribeModule from "../SubscribeModule/SubscribeModule";
import ImageModule from "../../modules/image-render";
// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
import FormFields from "../../forms/newsletter_horizondal_form.json";
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const Newsletter = loadable(() => import("../forms/default-form-layout"));
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const NewsletterModule = (props) => {
    var imagename = "page.tile_section_image.tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_section_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_section_image_Transforms;
    }
    return (
        <section className={`valuation-wrapper position-relative ${props.subscribe_form ? "subscribe" : ""}`}>
            <Container>

                <Row className="d-flex align-items-center">
                    <Col lg={props.subscribe_form ? 7 : 4} className="order-lg-1 order-2">
                        {props.description && <ContentModule Content={props.description?.data?.description} />}
                        {props.subscribe_form ?
                            <div className="subscribe-module-wrapper"><Newsletter formStyle={"horizontal"} fields={FormFields} classname="get-started-form newsletter" formtagclassname="subscribe-terms-news-landing" /></div> :<>
                            {props.cta_link && <CTALink class="button button-secondary-outline-bg" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />}</> }
                    </Col>
                    <Col lg={1} className="order-lg-2"></Col>
                    <Col lg={props.subscribe_form ? 4 : 7} className="order-lg-3 order-1">
                        <div className="valuation-img-wrapper">
                            <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewsletterModule