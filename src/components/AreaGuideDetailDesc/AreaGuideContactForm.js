import React from "react";
import loadable from "@loadable/component";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormFields from "../../../static/forms/contact_form.json";
import '../NewsDetailSubscribe/assets/styles/_index.scss';
const Newsletter = loadable(() => import("../forms/default-form-layout"));

const NewsDetailSubscribe = (props) => {
    return (
        <div className="news-detail-subscribe-wrapper">
            <div className="news-detail-subscribe-content">
                <h5>Enquire Now</h5>
                {/* <p>We'll send you bi-weekly updates.</p> */}
                <Newsletter formStyle={"vertical"} fields={FormFields} classname="enquiry-form-wrapper" formtagclassname="" />
            </div>
        </div>
    )
}

export default NewsDetailSubscribe