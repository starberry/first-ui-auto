import React from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import { StaticImage } from "gatsby-plugin-image";
import ImageModule from "../../modules/image-render";
import ScrollAnimation from 'react-animate-on-scroll';
// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const TileBlock = (props) => {
    var imagename = "page.tile_section_image.tile_image";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms?.tile_section_image_Transforms) {
        processedImages = props?.imagetransforms?.tile_section_image_Transforms;
    }
    return (
        <section className={`tile-block-wrapper position-relative ${props.image_alignment === "right" ? "tile-right" : ""}`}>
            <Container>
                <Row className={`d-flex align-items-center ${props.image_alignment === "right" ? "flex-row-reverse" : ""}`}>
                    <Col lg={6}>
                        <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={100} offset={10}>
                            <div className="tile-img-wrapper">
                                {/* <img src={props.img} className="img-fluid position-absolute" alt="" /> */}
                                {
                                    props.image_alignment === "right" ?
                                        <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                                        :
                                        <ImageModule ImageSrc={props?.image} altText={props?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={props?.id} classNames="img-fluid" />
                                }
                            </div>
                        </ScrollAnimation>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={5}>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>{props.description && <ContentModule Content={props.description?.data?.description} />}</ScrollAnimation>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={20}>{props.cta_link && <CTALink class="button button-secondary-outline" link={props.cta_link} title={props.cta_title} target_window={props.cta_link.target_window} />}</ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default TileBlock