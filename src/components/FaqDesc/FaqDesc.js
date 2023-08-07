import React, { useEffect, useState } from "react"
import { Container, Row, Col, Accordion } from "react-bootstrap"
// import ScrollAnimation from 'react-animate-on-scroll'
import FaqSidebar from "../FaqSidebar/FaqSidebar"
import './assets/styles/_index.scss'

const FaqDesc = (props) => {

    // Sticky scroll
    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 250)
        })
    }, [])
    // Sticky scroll

    return (
        <section className="faq-desc-wrapper">
            <Container>
                <Row>
                    <Col xl={7}>
                        <div className="faq-desc">
                            <h1>Frequently Asked Questions</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                            
                            <ul className="list-unstyled faq-desc-list">
                                <li>
                                    <h3>Buying FAQs</h3>
                                    <Accordion className="faq-accordion">
                                        <Accordion.Item eventKey={0}>
                                            <Accordion.Header>What is freehold property?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={1}>
                                            <Accordion.Header>What is the difference between freehold and leasehold?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={2}>
                                            <Accordion.Header>What is RERA Dubai?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={3}>
                                            <Accordion.Header>What is DEWA Dubai?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={4}>
                                            <Accordion.Header>How do I apply for DEWA?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={5}>
                                            <Accordion.Header>What is Ejari Dubai?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </li>
                                <li>
                                    <h3>Selling FAQs</h3>
                                    <Accordion className="faq-accordion">
                                        <Accordion.Item eventKey={0}>
                                            <Accordion.Header>How can I register to Ejari?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={1}>
                                            <Accordion.Header>Do I need Ejari for DEWA?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={2}>
                                            <Accordion.Header>What is Security deposit, how much is it and what does it cover?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={3}>
                                            <Accordion.Header>What are the deposits required for renting a property?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={4}>
                                            <Accordion.Header>Does the Tenant needs to register his Tenancy Contract with Ejari?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={5}>
                                            <Accordion.Header>Can a Tenant terminate his contract during the Tenancy Period?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </li>
                                <li>
                                    <h3>Off Plan FAQs</h3>
                                    <Accordion className="faq-accordion">
                                        <Accordion.Item eventKey={0}>
                                            <Accordion.Header>Can I sell an off plan property before its completion date?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={1}>
                                            <Accordion.Header>What are the required documents needed to list a property?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={2}>
                                            <Accordion.Header>What is the eligibility criteria for getting a UAE investor visa?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey={3}>
                                            <Accordion.Header>Can any foreign nationals own freehold property in Dubai?</Accordion.Header>
                                            <Accordion.Body>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam.</p>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, nulla id vestibulum finibus, eros ligula posuere quam, a semper nisl massa vel enim.</p>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xl={1}></Col>
                    <Col xl={4}>
                        <div className={`faq-sidebar-wrapper position-sticky ${scroll ? "scrolled" : ""}`}>
                            <FaqSidebar />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default FaqDesc