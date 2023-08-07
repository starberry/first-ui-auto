import React from "react";
import { Row, Col } from "react-bootstrap";
import MortgageCalculator from "./MortgageCalculator";
import StampDutyCalculator from "./StampDutyCalculator";
import './assets/styles/_index.scss';

const PropertyCalculator = (props) => {
    return (
        <>
            <MortgageCalculator 
                propertyPrice={props?.prop_price ? props?.prop_price : "500000"}
            />

            <Row>
                <Col>
                    <div className="property-split-line"></div>
                </Col>
            </Row>

            <StampDutyCalculator 
                propertyValue={props?.prop_price ? props?.prop_price : "500000"}
            />
        </>
    )
}

export default PropertyCalculator