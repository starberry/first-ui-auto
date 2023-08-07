import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ImageModule from "../../modules/image-render";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const {ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const {CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const ValuationModule = (props) => {
    var imagename = "page.tile_section_image.tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_section_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_section_image_Transforms;
    }
    return (
        <section className={`valuation-wrapper position-relative`}>
            <Container>

                <Row className="d-flex align-items-center">
                    <Col lg={4} className="order-lg-1 order-2">
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>{props.description && <ContentModule Content={props.description?.data?.description} />}</ScrollAnimation>
                    <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>{props.cta_link && <CTALink class="button button-secondary-outline-bg" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />}</ScrollAnimation>
                    </Col>
                    <Col lg={1} className="order-lg-2"></Col>
                    <Col lg={7} className="order-lg-3 order-1">
                        <div className="valuation-img-wrapper">
                            <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ValuationModule