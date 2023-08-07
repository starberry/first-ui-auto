import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "gatsby";
import './assets/styles/_index.scss';

const ValuationThankYou = (props) => {
    //console.log("props", props)
    const [selectState, setselectState] = useState("sales");


    return (
        <div className="valuation-thanks-wrapper">
            <Row className="d-flex justify-content-center">
                <Col xl={10}>
                    <div className="text-center">
                        <div className="valuation-thanks-title-sm">Valuation Report</div>
                        <h2>{props.address}</h2>
                        <ul className="list-inline valuation-thanks-list">
                            <li className="list-inline-item">
                                <a href="javascript:;" className={selectState == "sales" ? "button button-primary button-sec" : "button button-secondary-outline button-sec"} onClick={() => setselectState("sales")}>Sales</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="javascript:;" className={selectState != "sales" ? "button button-primary button-sec" : "button button-secondary-outline button-sec"} onClick={() => setselectState("lettings")}>Lettings</a>
                            </li>
                        </ul>
                    </div>

                    <div className="valuation-est-wrapper d-md-flex justify-content-between">
                        <div className="text-md-start text-center valuation-est-text-wrapper">
                            <div className="valuation-dots d-md-block d-none"></div>
                            <div className="valuation-est-title">Min Value</div>
                            <div className="valuation-est-price">£{selectState == "sales" ? props.minimum_sale_estimation.toLocaleString() : props.minimum_rent_estimation.toLocaleString()}</div>
                        </div>
                        <div className="text-center valuation-est-text-wrapper">
                            <div className="valuation-dots large m-auto d-md-block d-none"></div>
                            <div className="valuation-est-title">Est Value</div>
                            <div className="valuation-est-price est-mid-price">£{selectState == "sales" ? props.average_sale_estimation.toLocaleString() : props.average_rent_estimation.toLocaleString()}</div>
                        </div>
                        <div className="text-md-end text-center valuation-est-text-wrapper mb-0">
                            <div className="valuation-dots ms-auto d-md-block d-none"></div>  
                            <div className="valuation-est-title">Max Value</div>
                            <div className="valuation-est-price">£{selectState == "sales" ? props.maximum_sale_estimation.toLocaleString() : props.maximum_rent_estimation.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* <div className="valuation-btn-wrapper">
                        <Link to="../" className="button button-primary button-sec">Book a valuation appointment</Link>
                    </div> */}

                    <p><span>Please note, this valuation is an estimate</span>. This online valuation was generated automatically using Land Registry data and property listings data. It doesn't take into account any developments made to your property. For a more accurate valuation, please book in a valuation.</p>
                </Col>
            </Row>
        </div>
    )
}

export default ValuationThankYou