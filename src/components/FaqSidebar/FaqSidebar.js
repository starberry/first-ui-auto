import React, { useEffect, useState } from "react"
import { Container, Row, Col, Accordion, Form } from "react-bootstrap"
import { Link } from "gatsby"
import './assets/styles/_index.scss'

const FaqSidebar = (props) => {
    return (
        <div className="faq-sidebar">
            <div className="faq-sidebar-content">
                <h5>Enquire Now</h5>
                <p>Aliquam consectetur auctor nisl varius ornare. Integer non diam nec lectus pulvinar</p>

                <Form action="/" className="faq-sidebar-form">
                    <Form.Group className="theme-form-group">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="theme-form-group">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="chris@starberry.tv" />
                    </Form.Group>
                    <Form.Group className="theme-form-group">
                        <Form.Label>Telephone Number</Form.Label>
                        <Form.Control type="text" placeholder="" />
                    </Form.Group>
                    <Form.Group className="theme-form-group">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={5} className="form-text-area" placeholder="Write your message here..." />
                    </Form.Group>
                    <button type="submit" class="button button-primary btn">Subscribe</button>
                </Form>

                <div className="enquiry-term-text">
                    By clicking Subscribe, you agree to our <Link to="">Terms & Conditions</Link> and <Link to="">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    )
}

export default FaqSidebar