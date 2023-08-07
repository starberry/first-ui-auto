import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import OfficeDetailsSidebar from "../OfficeDetailsSidebar/OfficeDetailsSidebar";
import PropertyDetailsMap from "../PropertyDetailsMap/PropertyDetailsMap";
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")

const OfficeDetailsDescription = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)
    const [renderComponent, setRenderComponent] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 750)
        })
        window.addEventListener("mousemove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("touchmove", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
        window.addEventListener("keypress", () => {
            if (renderComponent === false) {
                setRenderComponent(true)
            }
        })
    }, [])
    // Sticky scroll

    return (
        <section className="office-details-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="office-details-desc-text-wrapper">
                            <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={100} offset={10}>{props.about && <ContentModule Content={props.about?.data?.about} />}</ScrollAnimation>

                            <div className="office-detail-divider-line"></div>

                            {props.latitude && props.longitude && <div className="property-desc-title">{props.title}</div>}
                            {props.latitude && props.longitude && <PropertyDetailsMap
                                lat={props.latitude}
                                lng={props.longitude}
                            />}
                            {/* <div className="office-details-explore-text"><span>Want to explore Keighley further?</span> Explore our <Link to="" className="link-underline">Keighley Area Guide</Link></div> */}
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`office-details-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                <OfficeDetailsSidebar {...props} />
                            </ScrollAnimation>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default OfficeDetailsDescription