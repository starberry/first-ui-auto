import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "gatsby";
// import './assets/styles/_index.scss';

const EnquiryForm = (props) => {
    return (
        <div className="enquiry-form-wrapper">
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col xl={7}>
                        <Form>
                            <Form.Group className="theme-form-group">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email Address" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Telephone Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter Telephone Number" />
                            </Form.Group>

                            <Form.Group className="theme-form-group">
                                <Form.Label>Message</Form.Label>
                                <Form.Control className="form-text-area" as="textarea" rows={3} placeholder="Write your message here..." />
                            </Form.Group>

                            <Button variant="" className="button button-primary" type="submit">Submit Enquiry</Button>

                            <div className="enquiry-term-text text-center">By clicking Subscribe, you agree to our <Link to="">Terms & Conditions</Link> and <Link to="">Privacy Policy</Link>.</div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EnquiryForm