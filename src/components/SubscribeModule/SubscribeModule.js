import React from "react";
import { Form, Button } from "react-bootstrap";
import './assets/styles/_index.scss';

const SubscribeModule = (props) => {
    return (
        <div className="subscribe-module-wrapper">
            <Form className="d-md-flex justify-content-between">
                <Form.Group className="subscribe-form-group">
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group className="subscribe-form-group">
                    <Form.Control type="email" placeholder="Email Address" />
                </Form.Group>
                <Button variant="" className="button button-primary" type="submit">Subscribe</Button>
            </Form>
        </div>
    )
}

export default SubscribeModule