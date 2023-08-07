import React from "react";
import { Link } from "gatsby";
import loadable from "@loadable/component";
import { useStaticQuery, graphql } from "gatsby"
import ScrollAnimation from 'react-animate-on-scroll';
import { Container, Row, Col } from "react-bootstrap";
import { PageLinks } from "../../common/site/page-static-links";
import './assets/styles/_index.scss';
import ImageModule from "../../modules/image-render";
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const Banner = (props) => {

    var areaimagename = "area-guide.banner_image.details";

    let processedImages = JSON.stringify({});
    if (props?.imagetransforms) {
        processedImages = props?.imagetransforms;
    }

    const { site } = useStaticQuery(
        graphql`
        query {
          site {
            siteMetadata {
                elfSight {
                  review
                  review_badge
                  review_carousel
                  review_page
                }
            }
          }
        }
      `
    )

    const elfData = site.siteMetadata?.elfSight

    return (
        <section className={`banner ${props.tag === "landing" ? "inner-page" : ""}`}>
            <ImageModule ImageSrc={props?.image} altText={`${props?.image?.alternativeText ? props?.image?.alternativeText : props.banner_title ? props.banner_title : props.title} banner`} imagetransforms={processedImages} renderer="bgImg" imagename={areaimagename} strapi_id={props?.id} classNames="img-fluid banner-img" />
            <div className="overlay-bg"></div>
            <Container className="banner-search-container">
                <Row>
                    <Col lg={12}>

                        {props.banner_title && <ScrollAnimation animateIn="animate__slideInUp" animateOnce><h1>{props.banner_title}</h1></ScrollAnimation>}
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>{props.banner_content && <ContentModule Content={props.banner_content?.data?.banner_content} />}</ScrollAnimation>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={300} offset={10}>
                            <ul className="list-inline">
                                {PageLinks.results_sales && <li className="list-inline-item">
                                    <Link className="button button-primary" to={`/${PageLinks.results_sales}/`}>Property For Sale</Link>
                                </li>}
                                {PageLinks.results_lettings && <li className="list-inline-item">
                                    <Link className="button button-secondary-outline-bg" to={`/${PageLinks.results_lettings}/`}>Property To Rent</Link>
                                </li>}
                            </ul>
                        </ScrollAnimation>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Banner