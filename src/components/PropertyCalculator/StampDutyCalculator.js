import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"
import { Row, Col, Form } from "react-bootstrap";
import loadable from "@loadable/component";
import {
    calculate,
    countries,
} from "uk-ireland-stampduty-calculator"
// import { filterNumber, numberFormat } from "./utils"
import './assets/styles/_index.scss';
const { filterNumber, numberFormat } = require("@starberry/gatsby-theme-utils/Common/Utils")
const Select = loadable(() => import("react-select"));

const { Site_Vars } = require("../../common/site/config");

const StampDutyCalculator = (props) => {

    // Dropdown react select styles
    const customStyles = {
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? "#081D3C" : "null",
                color: isSelected ? "#ffffff" : "#34373D",
                "&:hover": {
                    color: "#ffffff",
                    cursor: "pointer",
                    backgroundColor: "#081D3C",
                }
            }
        },
        control: styles => ({
            ...styles,
            backgroundColor: null,
            border: 0,
            paddingLeft: 0,
            outline: 0,
            boxShadow: "none",
            color: "#fff",
            fontSize: "1rem",
        }),
        valueContainer: styles => ({
            ...styles,
            fontSize: "1rem",
            paddingLeft: 0,
            lineHeight: "21px",
            cursor: "pointer",
        }),
        dropdownIndicator: styles => ({
            ...styles,
            color: "#fff",
        }),
        indicatorsContainer: styles => ({
            ...styles,
            color: "#fff",
            cursor: "pointer",
        }),
        indicatorSeparator: () => null,
        placeholder: defaultStyles => {
            return {
                ...defaultStyles,
                color: "#34373D",
                marginLeft: 0,
            }
        },
    }
    // Dropdown react select styles

    // const propertyTypes = [
    //     {
    //         value: "residential",
    //         label: "Residential",
    //     },
    //     {
    //         value: "commercial",
    //         label: "Commercial",
    //     },
    // ]

    const options = [
        { value: 'first', label: 'First Time Buyer' },
        { value: 'home', label: 'I’m buying my home' },
        { value: 'investor', label: 'I’m buying an additional home' },
    ]

    const currency = props.currency

    const [result, setResult] = useState(false)

    const [propertyType, setPropertyType] = useState(props.propertyType)
    const [propertyValue, setPropertyValue] = useState(
        currency + numberFormat(filterNumber(props.propertyValue))
    )
    const [buyer, setBuyer] = useState(props.buyerType)

    const formatPrice = str => {
        return currency + str.toLocaleString("en-US")
    }

    const doCalculate = (purchase_price_price) => {
        const results = calculate(
            filterNumber(purchase_price_price ? purchase_price_price : propertyValue),
            propertyType,
            countries.ENGLAND,
            buyer
        )
        let effectiveRate = (results.tax / filterNumber(propertyValue)) * 100
        effectiveRate = new Intl.NumberFormat("en-US", {}).format(effectiveRate)
        let summaryBands = []
        results.summaryBands.map(result => {
            summaryBands.push(
                result.adjustedRate +
                "% between " +
                formatPrice(result.start) +
                " and " +
                formatPrice(result.end)
            )
        })
        const result = {
            effectiveRate: effectiveRate + "%",
            summaryBands: summaryBands,
            tax: formatPrice(results.tax),
        }
        setResult(result)
    }

    const handleSubmit = event => {
        event.preventDefault()
        event.stopPropagation()

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'formSubmit',
            'formType': "Stampduty calculator",
            'formId': "Stampduty calculator",
            'formName': "Stampduty calculator",
            'formLabel': "Stampduty calculator"
        });

        doCalculate()
    }

    const handleDeposit = event => {
        var purchase_price_price = currency + numberFormat(filterNumber(event.target.value));
        // doCalculate(purchase_price_price);
        setPropertyValue(purchase_price_price)
    }

    // const handlePropertyType = event => {
    //     setPropertyType(event.target.value)
    // }

    const handleBuyer = event => {
        setBuyer(event.value)
    }

    useEffect(() => {
        doCalculate()
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <div className="property-desc-title">Stamp Duty Calculator</div>
                </Col>
            </Row>

            <Form
                name="MortgageCalc"
                noValidate
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Row>
                    <Col xl={5} lg={6} md={6}>
                        <Form.Group className="calc-form-group">
                            <Form.Label for="property_iam">I am</Form.Label>
                            <div className="dropdown-select d-flex align-items-center">
                                <Select
                                    options={options}
                                    isSearchable={false}
                                    placeholder={"First Time Buyer"}
                                    className={"select-control"}
                                    classNamePrefix={"react-select"}
                                    styles={customStyles}
                                    components={{ DropdownIndicator: () => <i className="icon icon-select-dropdown-dark"></i>, IndicatorSeparator: () => null }}
                                    onChange={handleBuyer}
                                    id="property_iam"
                                />
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xl={4} lg={6} md={6}>
                        <Form.Group className="calc-form-group">
                            <Form.Label for="property_price_stamp">Property Price</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                value={propertyValue}
                                onChange={handleDeposit}
                                maxLength={13}
                                id="property_price_stamp"
                            />
                        </Form.Group>
                    </Col>
                    <Col xl={3} lg={12} className="d-flex align-items-end">
                        <button className="button button-primary calc-btn" type="submit">Calculate</button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="estimate-card">
                            <div className="property-desc-title-sm">Stamp Duty</div>
                            <div className="property-desc-calc-price">{result.tax}</div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="calc-nego-wrapper">
                            <div className="calc-nego-text-card">
                                {/* <div className="calc-nego-text stamp-calc-text">You have to pay stamp duty:</div>
                                <div className="calc-nego-text-sm">5% between £425,000 and £625,000</div>
                                <div className="calc-nego-text-sm">Your effective stamp duty rate is 0.95%.</div> */}
                                {result && (
                                    <p className="stampdutytext">
                                        <div className="calc-nego-text stamp-calc-text">You have to pay stamp duty:</div>
                                        {result.summaryBands.map((sm, i) => {
                                            return <div className="calc-nego-text-sm" key={i}>{sm}</div>
                                        })}
                                        {result && result.effectiveRate != "NaN%" && <div className="calc-nego-text-sm">Your effective stamp duty rate is {result.effectiveRate}.</div>}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

StampDutyCalculator.defaultProps = {
    propertyType: `residential`,
    propertyValue: `0`,
    buyerType: `first`,
    currency: process.env.CURRENCY ? process.env.CURRENCY : Site_Vars.default_currency,
}

StampDutyCalculator.propTypes = {
    propertyType: PropTypes.string,
    propertyValue: PropTypes.any,
    buyerType: PropTypes.string,
    currency: PropTypes.string,
}

export default StampDutyCalculator