import React from "react";
import loadable from "@loadable/component";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormFields from "../../forms/newsletter_vertical_form.json";
import './assets/styles/_index.scss';
const Newsletter = loadable(() => import("../forms/default-form-layout"));

const NewsDetailSubscribe = (props) => {
    return (
        <div className="news-detail-subscribe-wrapper">
            <div className="news-detail-subscribe-content">
                <h5>Stay in the loop</h5>
                <p>We'll send you bi-weekly updates.</p>
                <Newsletter formStyle={"vertical"} fields={FormFields} classname="get-started-form newsletter" formtagclassname="" />
            </div>
        </div>
    )
}

export default NewsDetailSubscribe