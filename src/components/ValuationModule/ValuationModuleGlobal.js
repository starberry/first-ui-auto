import React from "react";
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby"
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import { StaticImage } from "gatsby-plugin-image";
import SubscribeModule from "../SubscribeModule/SubscribeModule";
import ImageModule from "../../modules/image-render";
// import ContentModule from "../../modules/content-render";
// import CTALink from "../../modules/cta_link"
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const ValuationModule = (props) => {

  const data = useStaticQuery(graphql`
        query {
            strapiSiteConfig {
                global_footer_module {
                  description {
                    data {
                      description
                    }
                  }
                  background_color_transparent
                  cta_title
                  cta_link {
                    slug
                    target_window
                    link_type
                    external_link
                    strapi_parent {
                      slug
                    }
                  }
                  image_alignment
                  subscribe_form
                  image {
                    alternativeText
                    url
                  }
                }
              }
        }
    `);

  const global = data.strapiSiteConfig.global_footer_module;

  return (
    <section className={`valuation-wrapper position-relative ${global.subscribe_form ? "subscribe" : ""}`}>
      <Container>

        <Row className="d-flex align-items-center">
          <Col lg={global.subscribe_form ? 7 : 4} className="order-lg-1 order-2">
            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>{global.description && <ContentModule Content={global.description?.data?.description} />}</ScrollAnimation>
            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
              {global.subscribe_form ? <>
                <SubscribeModule />
                <div className="subscribe-terms">By clicking Subscribe, you agree to our <Link to="/terms-and-condition/">Terms & Conditions</Link> and <Link to="/privacy-policy/">Privacy Policy</Link>.</div></> : <>
                {global.cta_link && <CTALink class="button button-secondary-outline-bg" link={global.cta_link} title={global.cta_title} target_window={global.cta_link.target_window} />}</>}
            </ScrollAnimation>
          </Col>
          <Col lg={1} className="order-lg-2"></Col>
          <Col lg={global.subscribe_form ? 4 : 7} className="order-lg-3 order-1">
            <div className="valuation-img-wrapper">
              <StaticImage src="../../images/valuation_img.png" layout="fullWidth" placeholder="blurred" formats={["webp"]} alt="banner" quality="90" className="img-fluid position-static" />

              {/* <ImageModule ImageSrc={global?.image} altText={global?.image?.alternativeText} imagetransforms={processedImages} renderer="srcSet" imagename={imagename} strapi_id={global?.id} classNames="img-fluid" /> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default ValuationModule