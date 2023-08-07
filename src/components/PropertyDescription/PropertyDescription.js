import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import PropertyKeyDetails from "./PropertyKeyDetails";
import PropertyCalculator from "../PropertyCalculator/PropertyCalculator";
import PropertyDetailsMap from "../PropertyDetailsMap/PropertyDetailsMap";
import PropertySidebar from "../PropertySidebar/PropertySidebar";
import { useAllStrapiOffice } from "../../hooks/use-all-strapioffice"
import './assets/styles/_index.scss';
import ReadMore from "../ReadMore/ReadMore";

const PropertyDescription = (props) => {

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
    let prop_desc = props?.long_description?.data?.long_description
    if (prop_desc == "") {
        prop_desc = props?.description?.data?.description
    }

    var office_data = useAllStrapiOffice()
    office_data = office_data.allStrapiOffice.nodes
    let office_key;
    if (props?.office_mapping != "") {
        for (let k in office_data) {
            if (props?.office_mapping == office_data[k].property_office_mapping) {
                office_key = k;
                break;
            }
        }
    }

    return (
        <section className="property-desc-wrapper" id="property-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <PropertyKeyDetails {...props} />

                        <Row>
                            <Col>
                                <div className="property-split-line"></div>
                            </Col>
                        </Row>

                        {prop_desc && <Row>
                            <Col lg={12}>
                                <div className="property-desc-title">Property Description</div>
                                <ReadMore
                                    content={prop_desc}
                                    height={270}
                                    className={"property-desc-text"}
                                />
                            </Col>
                        </Row>}

                        {prop_desc && <Row>
                            <Col>
                                <div className="property-split-line"></div>
                            </Col>
                        </Row>}

                        {props?.features && props?.features.length > 0 && <Row>
                            <Col lg={12}>
                                <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={100} offset={10}>
                                    <div className="property-desc-title">Features</div>
                                    <ul className="list-unstyled property-features-list">
                                        {(props?.features).map((feature, i) => <li>{feature}</li>)}
                                    </ul>
                                </ScrollAnimation>
                            </Col>
                        </Row>}

                        {props?.features && props?.features.length > 0 && <Row>
                            <Col>
                                <div className="property-split-line"></div>
                            </Col>
                        </Row>}

                        {props?.search_type === "sales" && 
                            <ScrollAnimation animateIn="animate__fadeIn" animateOnce delay={100} offset={10}>
                                <PropertyCalculator prop_price={props?.price} />
                            </ScrollAnimation>
                        }

                        {props?.search_type === "sales" && 
                            <Row>
                                <Col>
                                    <div className="property-split-line"></div>
                                </Col>
                            </Row>
                        }

                        <Row>
                            <Col lg={12}>
                                <div className="property-desc-title">{props?.display_address}</div>
                                {renderComponent &&
                                    <PropertyDetailsMap
                                        lat={props?.latitude}
                                        lng={props?.longitude}
                                    />
                                }
                                {/* <div className="desc-link-text"><span>Want to explore Keighley further?</span> Explore our <Link to="" className="link-underline">Keighley Area Guide</Link></div> */}
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`property-sidebar position-sticky ${scroll ? "scrolled" : ""}`}>
                            {office_key >= 0
                                ? <PropertySidebar propofficedata={office_data[office_key]} />
                                : <PropertySidebar />
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default PropertyDescription