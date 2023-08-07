import React from "react";
import { Row, Col } from "react-bootstrap";
import './assets/styles/_index.scss';
const { Site_Vars } = require("../../common/site/config");

const NewHomesKeyDetails = (props) => {
    return (
        <div className="new-homes-key-details-wrapper">
            <div class="property-desc-title">Key Details</div>

            <Row>
                <Col xl={12} xs={6}>
                    <div class="desc-key-wrapper">
                        <div class="desc-key-title">{props.price_qualifier ? props.price_qualifier : "Price" }</div>
                        <div class="desc-key-text">{Site_Vars.default_currency}{props?.price?.toLocaleString()} {props?.max_price ? ` - ${Site_Vars.default_currency}${props?.max_price?.toLocaleString()}` : ''}</div>
                    </div>
                    <div className="news-homes-key-details-divider-line"></div>
                </Col>

                <Col xl={12} xs={6}>
                    <div class="desc-key-wrapper">
                        <div class="desc-key-title">Estimated completion</div>
                        <div class="desc-key-text">Summer 2023</div>
                    </div>
                    <div className="news-homes-key-details-divider-line"></div>
                </Col>

                <Col xl={12} xs={6}>
                    <div class="desc-key-wrapper">
                        <div class="desc-key-title">Tenure</div>
                        <div class="desc-key-text">Freehold</div>
                    </div>
                    <div className="news-homes-key-details-divider-line d-xl-block d-none"></div>
                </Col>

                <Col xl={12} xs={6}>
                    <div class="desc-key-wrapper">
                        <div class="desc-key-title">Council Tax Band:</div>
                        <div class="desc-key-text">Band C</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default NewHomesKeyDetails