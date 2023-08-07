import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ScrollAnimation from 'react-animate-on-scroll';
import './assets/styles/_index.scss';
const { ContentModule } = require("@starberry/gatsby-theme-utils/Modules/ContentModule")
const { CTALink } = require("@starberry/gatsby-theme-utils/Modules/CTALinkModule")

const ContactIntro = (props) => {
    return (
        <section className="contact-intro-wrapper">
            <Container>
                <Row>
                    <Col xl={6}>
                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>{props.title ? <h1>{props.title}</h1> : <h1>{props.pagename}</h1>}</ScrollAnimation>

                        <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>{props.content && <ContentModule Content={props.content?.data?.content} />}</ScrollAnimation>

                        <ul className="list-inline d-md-flex d-none">
                            {props.cta_1_link && <li className="list-inline-item">
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={100} offset={10}>
                                    <CTALink class="button button-primary" link={props.cta_1_link} title={props.cta_1_title} target_window={props.cta_1_link.target_window} />
                                </ScrollAnimation>
                            </li>}
                            {props.cta_2_link && <li className="list-inline-item">
                                <ScrollAnimation animateIn="animate__slideInUp" animateOnce delay={200} offset={10}>
                                    <CTALink class="button button-secondary-outline" link={props.cta_2_link} title={props.cta_2_title} target_window={props.cta_2_link.target_window} />
                                </ScrollAnimation>
                            </li>}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ContactIntro